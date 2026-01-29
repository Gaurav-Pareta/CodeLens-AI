import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  try {
    const { code, language = "javascript" } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await aiService(code, language);
    res.json({ review: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI review failed" });
  }
};
