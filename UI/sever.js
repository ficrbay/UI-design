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
                { role: "system", content: "你要做的是把我所有的语句说的更加精美一些，不要落下话语里面的HTML标签，可以适当加一些html标签使得对话的样式更好看，不要加<p>标签，千万不要出现语法错误，不要说出其他话语，只输出简短的句子" },
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
