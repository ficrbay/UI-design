# 使用指南

## 1. 安装 nodejs

**安装地址**: [nodejs.org](https://nodejs.org/en/)

## 2. 安装依赖库

```bash
cd UI
npm install openai express cors dotenv
```

## 3. 配置 apikey

打开 sever.js , 将你的 api-key 放入 sever.js 文件中

```javascript
const openai = new OpenAI({
  apiKey: "your_api_key", //<--在这里放入你的api-key
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});
```

[**注意**]：本项目使用的是阿里云的 qwen-plus 模型，请去官网获取 api-key

## 4.启动服务器

```bash
node sever.js
```
