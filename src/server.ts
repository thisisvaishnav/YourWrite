import express from "express";
import path from "path";
import dotenv from "dotenv";
import { humanizeText } from "./humanize";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/api/humanize", async (req, res) => {
  const { text, writingSample } = req.body;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GOOGLE_API_KEY is not set in environment variables." });
  }

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Please provide text to humanize." });
  }

  if (text.trim().length === 0) {
    return res.status(400).json({ error: "Text cannot be empty." });
  }

  try {
    const humanized = await humanizeText(text, apiKey, writingSample);
    res.json({ result: humanized });
  } catch (err: any) {
    console.error("Humanize error:", err);
    res.status(500).json({ error: err.message || "Failed to humanize text." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", hasApiKey: !!process.env.GOOGLE_API_KEY });
});

app.listen(PORT, () => {
  console.log(`YourWrite server running at http://localhost:${PORT}`);
  console.log(`API key: ${process.env.GOOGLE_API_KEY ? "loaded" : "NOT SET — add GOOGLE_API_KEY to .env"}`);
});
