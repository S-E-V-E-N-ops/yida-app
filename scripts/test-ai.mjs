// 验证衣搭 AI 集成能否真实跑通（与 index.html 的 callDeepSeek 逻辑完全一致）
// 用法：node scripts/test-ai.mjs <你的DeepSeek API Key>
// 或：  DEEPSEEK_API_KEY=sk-xxx node scripts/test-ai.mjs
// key 只从命令行/环境变量读取，不会写进任何文件，可放心提交本脚本到仓库

const key = process.argv[2] || process.env.DEEPSEEK_API_KEY;
if (!key || key.startsWith('sk-your') || key === 'your-api-key-here') {
  console.error('❌ 请传入有效 API Key：node scripts/test-ai.mjs <你的key>');
  console.error('   (去 https://platform.deepseek.com 创建，需先充值，¥5 就够)');
  process.exit(1);
}

const URL = 'https://api.deepseek.com/v1/chat/completions';

const systemPrompt = `你是一个专业的女性穿搭顾问。根据用户衣柜推荐搭配。

只返回JSON，不要其他文字：
{
  "top_id": 数字,
  "bottom_id": 数字,
  "shoes_id": 数字,
  "explanation": "一句话搭配理由"
}

规则：全身不超过3个主色；基础色任意搭；亮色只配一件。
场合：上课→休闲，约会→精致，面试→正式，通勤→简约，运动→运动休闲。`;

const wardrobe = {
  tops: [
    { id: 101, name: '橄榄绿羊毛夹克', color: '橄榄绿' },
    { id: 102, name: '米白色风衣', color: '米白' },
  ],
  bottoms: [
    { id: 201, name: '浅蓝色高腰阔腿牛仔裤', color: '浅蓝' },
    { id: 202, name: '黑色高腰阔腿裤', color: '黑色' },
  ],
  shoes: [
    { id: 301, name: '黑色厚底切尔西短靴', color: '黑色' },
    { id: 302, name: '白色板鞋', color: '白色' },
  ],
};

const userPrompt = `今天天气25°C晴，场合是"通勤"。
衣柜：
上衣：${JSON.stringify(wardrobe.tops)}
下装：${JSON.stringify(wardrobe.bottoms)}
鞋子：${JSON.stringify(wardrobe.shoes)}
返回JSON推荐一套搭配。`;

console.log('正在调用 DeepSeek（deepseek-v4-flash，关思考，JSON mode）...');
const start = Date.now();

const res = await fetch(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`,
  },
  body: JSON.stringify({
    model: 'deepseek-v4-flash',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    thinking: { type: 'disabled' },
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 800,
  }),
});

const data = await res.json();
if (!res.ok) {
  console.error('❌ API 调用失败：HTTP', res.status);
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

const content = data.choices?.[0]?.message?.content;
console.log(`--- 原始返回（耗时 ${(Date.now() - start)}ms）---`);
console.log(content);

console.log('\n--- 解析验证（与 index.html 相同逻辑）---');
try {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  if (parsed?.top_id && parsed?.bottom_id && parsed?.shoes_id) {
    console.log('✅ 集成验证通过！返回：', JSON.stringify(parsed, null, 2));
    console.log('\n下一步：把这个 key 填进本地 index.html 的 DEEPSEEK_KEY，用 Live Server 打开即可真实演示 AI。');
    console.log('（注意：key 不要提交到 GitHub，公开链接保持 Demo 模式运行）');
  } else {
    console.log('⚠️ JSON 解析完成但字段不完整，请检查返回结构：', parsed);
  }
} catch (e) {
  console.error('❌ JSON 解析失败：', e.message);
}
