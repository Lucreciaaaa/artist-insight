import expressPkg from 'express'; // CommonJS
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

import type { Request, Response } from 'express';

dotenv.config();

const express = expressPkg;
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.LASTFM_API_KEY;

if (!API_KEY) {
  process.exit(1);
}

// Endpoint to get artist infos
app.get('/api/lastfm/artist/:name', async (req: Request, res: Response) => {
  const artistName = Array.isArray(req.params.name)
    ? req.params.name[0]
    : req.params.name;

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );

    if (!response.ok) {
      throw new Error(`Last.fm API returned status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching artist info:', err);
    res.status(500).json({ error: 'Failed to fetch artist info' });
  }
});

// Endpoint to get top tracks of an artist
app.get(
  '/api/lastfm/artist/:name/top-tracks',
  async (req: Request, res: Response) => {
    const artistName = Array.isArray(req.params.name)
      ? req.params.name[0]
      : req.params.name;

    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
          artistName
        )}&api_key=${API_KEY}&format=json`
      );

      if (!response.ok)
        throw new Error(`Last.fm API returned status ${response.status}`);

      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error('Error fetching top tracks:', err);
      res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// run npx ts-node server/lastfm.ts
