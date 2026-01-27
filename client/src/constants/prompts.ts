import { ArtistIdentity } from '../types/domain/artist';
import { ArtistMetrics } from '../types/domain/metrics';

export function generateArtistInsightsPrompt(
  artist: ArtistIdentity,
  metrics: ArtistMetrics
): string {
  const artistIdentity = {
    name: artist.name,
    tags: artist.tags,
  };

  const audienceMetrics = {
    listeners: metrics.audience.listeners,
    totalPlays: metrics.audience.plays,
    playsPerListener: Math.round(metrics.audience.engagement),
  };

  const topTracks = metrics.topTracks.map((track, index) => ({
    rank: index + 1,
    title: track.title,
    playCount: track.playCount,
  }));

  return `
You are a Music Business Intelligence Analyst.

Your task is to produce a concise, decision-oriented artist performance insight
based strictly on the structured data provided below.

This insight is intended for music industry professionals evaluating
whether an artist deserves deeper strategic attention. 

---

### INPUT DATA (STRUCTURED — DO NOT RESTATE VERBATIM)

Artist Identity:
${JSON.stringify(artistIdentity, null, 2)}

Audience Metrics:
${JSON.stringify(audienceMetrics, null, 2)}

Top Tracks:
${JSON.stringify(topTracks, null, 2)}

---

### ANALYSIS RULES (MANDATORY — NO EXCEPTIONS)

- Base your analysis ONLY on the provided data.
- Interpret patterns and signals; DO NOT restate the full dataset or list raw metrics.
- You MAY reference numeric values sparingly to support interpretation.
- DO NOT recompute, estimate, normalize, or extrapolate metrics.
- Treat all numeric values as already validated.
- Avoid promotional, marketing, or fan-oriented language.
- Maintain a neutral, professional analyst tone.
- Do not soften negative signals or artificially balance them unless supported by the data.

---

### OUTPUT FORMAT (STRICT — FAILURE IF NOT RESPECTED)

- Output MUST be valid Markdown.
- Output MUST contain EXACTLY three sections.
- Use ONLY the following section titles, in this exact order:
  1. ## Summary
  2. ## Key Driver
  3. ## Risk / Opportunity
- Each section MUST contain exactly ONE paragraph.
- Each paragraph MUST be between 2 and 5 sentences.
- Do NOT use bullet points, lists, subheadings, or line breaks inside sections.
- Do NOT add introductions, conclusions, disclaimers, or meta commentary.
- Do NOT mention that this is an AI-generated analysis.

---

### SECTION EXPECTATIONS

## Summary
Provide a high-level but data-grounded assessment of the artist’s current performance and audience behavior.
Indicate whether engagement appears stable, concentrated, or fragile.
This is a broad presentation of the artist's performances;
when presenting them, mention the artist name explicitly.

## Key Driver
Identify the primary structural factor explaining current performance
(e.g. catalog concentration, replay intensity, audience scale).
Support your claim with interpreted signals from the data. 
You may reference numeric values to provide concrete examples.
You may reference insights derived from any part of the provided structured input.

## Risk / Opportunity
Describe one clear risk and one clear opportunity derived from the data.
Frame this as a strategic outlook, not a list of recommendations.
`.trim();
}
