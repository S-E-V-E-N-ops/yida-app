export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;

  try {
    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'match') {
      // AI 搭配模式
      const { weather, occasion, wardrobeJson, lockedItem } = data;

      systemPrompt = `你是一个专业的女性穿搭顾问。你的任务是根据用户衣柜中的衣物推荐搭配。

你必须只返回一个JSON对象，不要包含其他文字：
{
  "top_id": 数字,
  "bottom_id": 数字,
  "shoes_id": 数字,
  "explanation": "一句话说明为什么这样搭配（15字以内）"
}

配色规则：
- 全身不超过3个主色
- 基础色（白/黑/灰/米/卡其）可以任意搭配
- 亮色单品只配一件，其余用基础色

场合规则：
- 上课：舒适休闲
- 约会：可以精致柔和
- 面试：得体正式，黑白灰蓝为主
- 通勤：简约大方
- 运动：运动休闲`;

      const lockedNote = lockedItem
        ? `用户已选定了一件单品：${lockedItem.name}（${lockedItem.category}），请保留这件，搭配其他品类。`
        : '请从所有品类中各选一件，组成完整搭配。';

      userPrompt = `今天天气${weather}，场合是"${occasion}"。${lockedNote}

用户衣柜里的衣物：
${JSON.stringify(wardrobeJson, null, 2)}

请根据以上衣物推荐一套搭配，返回JSON。`;

    } else if (type === 'consult') {
      // 买前咨询模式
      systemPrompt = `你是一个专业的女性穿搭顾问。用户想买一件新衣服，请你分析这件衣服是否适合她。

返回JSON格式：
{
  "compatibility": { "score": 4, "text": "可以和你衣柜里X件单品搭配，预计可组成X套搭配" },
  "styleMatch": { "score": 4, "text": "符合你偏好的XXX风格" },
  "value": { "level": "高/中/低", "reason": "推荐理由" },
  "alternative": "你衣柜里有没有类似替代品",
  "verdict": "推荐入手/可以再想想/不推荐"
}`;

      const { name, price, material, color, occasion, userStyles } = data;
      userPrompt = `用户想买：${name}，价格${price}元，材质${material}，颜色${color}，想在${occasion}场合穿。
用户风格偏好：${userStyles?.join('、') || '未设置'}
请分析这件衣服是否值得购买。返回JSON。`;
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash', // 2026-07 起 deepseek-chat 别名已弃用
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        thinking: { type: 'disabled' }, // 关思考：搭配任务是规则跟随，不需推理链
        response_format: { type: 'json_object' }, // 强制合法 JSON
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const result = await response.json();

    if (!result.choices || !result.choices[0]) {
      throw new Error('API 返回异常');
    }

    const content = result.choices[0].message.content;

    // 解析 JSON
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        res.json(JSON.parse(jsonMatch[0]));
      } else {
        res.json({ raw: content });
      }
    } catch (e) {
      res.json({ raw: content, parseError: true });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
