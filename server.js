import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-5.3",
      messages: [
        {
          role: "system",
          content: "Sen H5 çekirdeğisin. Gürültü → geometri → kırılım mantığıyla cevap ver."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hata oluştu" });
  }
});

app.get("/", (req, res) => {
  res.send("H5 çalışıyor 🚀");
});

app.listen(3000, () => {
  console.log("Server çalışıyor: http://localhost:3000");
});
