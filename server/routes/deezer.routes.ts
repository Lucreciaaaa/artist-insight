import { Router } from "express";
import { fetchArtistImage } from "../services/deezer.service";

const router = Router();

router.get("/artist", async (req, res) => {
  const query = req.query.q;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query parameter" });
  }
  try {
    const data = await fetchArtistImage(query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Deezer artist" });
  }
});

export default router;
