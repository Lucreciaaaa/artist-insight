import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import deezerRoutes from "./routes/deezer.routes.js";
import lastfmRoutes from "./routes/lastfm.routes.js";
import llmRoutes from "./routes/llm.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/api/lastfm", lastfmRoutes);
app.use("/api/deezer", deezerRoutes);
app.use("/api/llm", llmRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// run npx tsx server.ts
