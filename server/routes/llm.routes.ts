import { Router } from "express";
import { generateInsights } from "../services/llm.service";

const router = Router();

router.post("/insights", async (req, res) => {
  const prompt = req.body?.prompt;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "A valid prompt string is required" });
  }

  try {
    const result = await generateInsights(prompt);
    res.json({ result });
  } catch (err: any) {
    console.error("LLM Route Error:", err);
    res.status(500).json({ error: "LLM generation failed" });
  }
});

export default router;
