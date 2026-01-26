import dotenv from "dotenv";
dotenv.config();

export const env = {
  lastfmKey: process.env.LASTFM_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
  port: process.env.PORT || 4000,
};
