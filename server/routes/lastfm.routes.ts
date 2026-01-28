import { Router } from "express";
import { fetchArtistInfo, fetchTopTracks } from "../services/lastfm.service.js";

const router = Router();

router.get("/artist/:name", async (req, res) => {
  try {
    const data = await fetchArtistInfo(req.params.name);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artist info" });
  }
});

router.get("/artist/:name/top-tracks", async (req, res) => {
  try {
    const data = await fetchTopTracks(req.params.name);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

export default router;
