# 🌸 Sauti Ya Mama – MVP

**Sauti Ya Mama** is a HealthTech prototype designed to promote menstrual and adolescent health literacy among girls through guided **mother–daughter conversations**.  
The MVP simulates a simple USSD-style web experience and lays the foundation for an accessible mobile USSD service for rural communities in **Kilifi (Bamba), Kenya**.

---

## 🧭 Project Vision
To empower mothers and daughters with open, trusted, and culturally sensitive conversations about **menstrual health, body changes, emotional well-being, relationships, and personal safety** — even in areas with limited internet access.

---

## 💡 Key Features
- **Simple Node.js + Express Web App** (single file: `server.js`)
- **Five Conversation Topics:**
  - Menstrual Health  
  - Body Changes  
  - Relationships  
  - Health & Safety  
  - Emotional Care  
- **Voice Playback:** Uses the browser’s SpeechSynthesis API to “hear Mama’s voice” (soon to integrate **Azure TTS** for an authentic African female voice)
- **In-memory Analytics:** Tracks how often each topic is accessed  
- **Mobile-Friendly Interface:** Designed with inline CSS for a warm, motherly tone  
- **Deployed Live on Render:** (https://sauti-ya-mama-sns4.onrender.com/)

---

## 🧰 Tech Stack
- **Backend:** Node.js + Express  
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Voice:** Web Speech API (SpeechSynthesis)  
- **Deployment:** Render (Free Node.js Service)

---

## 🚀 How to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/wanguicheche/sauti-ya-mama.git
