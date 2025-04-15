import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey:"your_api_key",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

app.get("/", (req, res) => {
    res.send("代理服务器已启动");
});

app.post("/api/chat", async (req, res) => {
    try {
        const { text } = req.body; 
        if (!text) {
            return res.status(400).json({ error: "缺少 text 参数" });
        }

        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "system", content: "请将我的所有语句润色，使其更加精美，同时保留原有的 HTML 标签，并可适当添加 HTML 标签以优化样式。但不要使用 <p> 标签，确保语法无误，仅输出优化后的句子，不要添加额外内容。" },
                { role: "user", content: text }
            ],
        });
        console.log(completion.choices[0].message.content);

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error("请求失败：", error);
        res.status(500).json({ error: "请求失败" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`代理服务器运行在 http://localhost:${PORT}`);
});
