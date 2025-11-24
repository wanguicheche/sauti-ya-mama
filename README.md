# 🌸 Sauti Ya Mama – MVP

**Sauti Ya Mama** is a HealthTech prototype designed to promote menstrual and adolescent health literacy among girls through guided **mother–daughter conversations**.  
The MVP simulates a simple USSD-style web experience and lays the foundation for an accessible mobile USSD service for rural communities in **Kilifi (Bamba), Kenya**.

Why Bamba?

Bamba, located in Kilifi County, faces long-standing challenges in menstrual health literacy, early pregnancy, and limited access to confidential health information.
Many mothers and daughters lack safe, guided spaces to discuss sensitive topics due to:
- Cultural silence around puberty and sexual health
- Limited digital access
- Low literacy levels
- Stigma around early pregnancy
- Fear of gender-based violence when conversations escalate at home

Sauti Ya Mama is designed to serve these communities by offering:
- Safe, private conversation prompts
- Structured guidance for mothers
- A future USSD pathway requiring no smartphone or internet
- Respectful, culturally aware health education

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
- 
🤖 Mama Bot (AI) - An in-app AI assistant that offers:
 - Gentle explanations
- Emotion-aware support
- Simple, clear guidance
- Safe and culturally sensitive responses
- Powered by an environment-secured OpenAI API.

🆘 Help Centre - A resource section to support:
- Early pregnancy guidance
- Gender-based violence support
- Mediation pathways for parents
- STD and HIV information
-Where teens or mothers can seek help

⚡ Quick Exit Button
- A safety feature allowing users to instantly leave the page for privacy.
  
- **In-memory Analytics:** Tracks how often each topic is accessed
- 
- **Mobile-Friendly Interface:** Designed with inline CSS for a warm, motherly tone
- 
- **Deployed Live on Render:** (https://sauti-ya-mama-sns4.onrender.com/)

---

## 🧰 Tech Stack
- **Backend:** Node.js + Express  
- **Frontend:** HTML, CSS, Vanilla JavaScript  
- **Voice:** Web Speech API (SpeechSynthesis)  
- **Deployment:** Render (Free Node.js Service)

---

🗺️ Future Roadmap
1. Full USSD Integration
Implement through a telco partner for offline access.

2. Azure Text-to-Speech (African Female Voice)
Replace browser TTS with a more natural, culturally aligned tone.

3. Crisis Support Flow
Early pregnancy support
GBV risk navigation + emergency hotlines
Referrals for counselling and safe centres

4. Anonymous Mode (Incognito Option)
Allow teen girls to explore topics discreetly.

5. Role-Based Paths
“For Mothers”
“For Teen Girls”
“For Health Volunteers / CHVs”

6. Local Language Versions
Kiswahili
Giriama (for Kilifi/Bamba communities)

7. Expanded Topics
HIV/STD awareness
Digital safety
Understanding attraction and identity with sensitivity and accuracy


✨ Built By
Alice Mwangi
A prototype created to support future USSD deployment for women and girls in Bamba, Kilifi County — ensuring every mother and daughter has a safe, trusted way to talk about health and growing up.
