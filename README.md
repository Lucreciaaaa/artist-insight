# Artist Insight

<p>
  <em>LLM-powered analysis of artist performance metrics, transforming raw data into actionable insights.</em>
  
</p>


<p align="center">
    <img src="https://github.com/user-attachments/assets/2d44f5b1-d4f0-4385-9b65-9ac231ce48f2" alt="Artist Insight Quick Preview" />
</p>

**Demo:** [https://artist-insight.vercel.app](#)

---

## 🎬 Mobile Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/b43f0337-9d53-406b-9aff-7d8f023ac703" alt="Mobile Preview" width="300" />
</p>

---

## 📖 Project Overview

**Artist Insight** is a **B2B mini-app frontend** designed to turn raw artist performance metrics into **actionable insights** using a **Large Language Model (LLM)**.

I created this tool because I often found myself staring at stats, wondering: _“I have the numbers, but what does it really mean?”_ My goal wasn’t to replace a full analytics platform, but to provide **fast, interpretable insights** that let teams grasp key signals in seconds.

The app focuses on three objectives: delivering **instant summaries**, providing **automated interpretations** of complex numbers, and highlighting **opportunities or risks** in performance trends. In essence, it’s a small but sharp lens to understand artist performance without drowning in data.

---

## 🎯 Core Features

- **Artist Search**
- **Key Metrics Display**: Shows total listeners, plays, audience loyalty, top track, top track share, plus genre tags and profile picture.
- **LLM-powered Insight Generation**: Produces structured analysis:
  - Summary of performance
  - Key driver behind results
  - Opportunities or risks
- **Plays per Track Visualization**: Simple descending bar chart for quick visual cues.
- **Copy-to-Clipboard**: Export insights easily for reports or meetings.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + TypeScript for scalable, type-safe components.
- **Styling:** Tailwind CSS for minimalistic and responsive design.
- **Data Sources:**
  - LastFM API for artist metrics and top tracks
  - Deezer API for artist images (fallback when missing)
- **LLM Integration:** Google Gemini 2.5 Flash via API for insight generation.
- **Backend:** Lightweight server to handle CORS and cache requests in localStorage.
- **Deployment:** Vercel for frontend, Render for backend.

---

## ⚙️ Design & Technical Decisions

When designing the app, I focused on clarity and value rather than feature quantity. Charts exist, but the primary deliverable is insight. Displaying only five metrics per artist was a deliberate choice: enough information to be meaningful, yet concise enough to be digestible.

Visually, the app embraces minimalism (white, gray, black) to let data stand out. Including the artist image adds a human touch, reminding users that these metrics reflect real creators. I consciously avoided over-engineering the frontend; a lightweight, component-driven architecture ensures maintainability and responsiveness without unnecessary complexity.

---

## 🧪 Challenges & Learnings

Working on Artist Insight was as much a lesson in **product thinking** as it was in coding. On the backend side, combining APIs and handling CORS required pragmatic decisions, but the main focus was on the frontend experience. Ensuring that artist images always display taught me to anticipate missing data gracefully and handle edge cases without breaking the UI.

On the frontend, I learned a lot about structuring React apps for maintainability and clarity. Managing component communication, centralizing logic in parent components, and lifting hooks to share state effectively were key lessons. Designing responsive layouts with Tailwind, from a sidebar on desktop to stacked elements on mobile, pushed me to think carefully about usability across devices.

Integrating the LLM also forced me to consider **UX around AI outputs**: prompts had to be structured so that insights were reliable, readable, and actionable.

Overall, these challenges reinforced the importance of **user clarity**, **practical, maintainable frontend design**, and a **scalable approach** that balances functionality with simplicity.

---

## 📬 Contact

**Lucrece Fodouop**  
📧 [lfodouop@gmail.com](mailto:lfodouop@gmail.com)
