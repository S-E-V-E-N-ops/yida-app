# 衣搭 — AI 穿搭助手

## 怎么用 AI 功能？

**三步搞定，不需要部署，不需要服务器：**

### 第 1 步：确认 API Key 已配置

代码里已经写好了 Key，不需要额外配置。

> 如果以后 Key 失效了，去 [platform.deepseek.com](https://platform.deepseek.com) 重新创建，替换 `index.html` 里第 1219 行的 `DEEPSEEK_KEY` 值。

### 第 2 步：打开页面

**方式一：直接双击打开（最简单）**
- 找到 `index.html` → 双击 → 浏览器打开
- ⚠️ 如果 API 调不通（CORS 跨域限制），用方式二

**方式二：用 Live Server 打开（推荐，无跨域问题）**
- VS Code 安装 Live Server 插件
- 右键 `index.html` → Open with Live Server
- 浏览器访问 `http://127.0.0.1:5500/index.html`

**方式三：部署到国内可访问的静态托管**
- **Zeabur**（最像 Vercel，国内友好）：zeabur.com
- **Surge**：`npm install -g surge && surge .`
- **GitHub Pages**：上传到 GitHub → Settings → Pages → 开启

### 第 3 步：验证 AI 能用

1. 搭配页 → 点「AI 搭配」按钮
2. 看到「AI 正在搭配…」→ 等 2-5 秒
3. 出现搭配结果 → ✅ AI 真的在工作了！

---

## 项目文件

| 文件 | 说明 |
|:----|:-----|
| `index.html` | 前端页面（AI Key 在 1219 行） |
| `assets/` | 衣物图片 |
| `api/chat.js` | （可选）Vercel 代理，用 Vercel 时才需要 |

---

## 费用

DeepSeek 价格 ¥0.5/百万 token，一次搭配 ≈ 1000 tokens。
充 ¥5 够 Demo 用一两年。
