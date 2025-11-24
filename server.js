require("dotenv").config();
const express = require('express');
const OpenAI = require('openai');
const app = express();
const PORT = 3000;

// Initialize OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve static files (like your logo)
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const analytics = {
  'menstrual-health': 0,
  'body-changes': 0,
  'relationships': 0,
  'health-safety': 0,
  'emotional-care': 0,
  'help-centre': 0,
  'mama-bot': 0
};

app.post('/api/track/:topic', (req, res) => {
  const topic = req.params.topic;
  if (analytics[topic] !== undefined) {
    analytics[topic]++;
    res.json({ success: true, views: analytics[topic] });
  } else {
    res.status(404).json({ success: false });
  }
});

app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});

// Mama Bot AI Route
app.post("/api/mama-bot", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    if (!userQuestion || userQuestion.trim() === '') {
      return res.json({ 
        success: false, 
        error: "Please ask a question." 
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Mama Bot, a warm, caring, and empathetic Kenyan mother giving advice to teenage girls, mothers, and guardians. 

Your personality:
- Speak in simple, clear English that a young girl can understand
- Be warm, supportive, and non-judgmental
- Use motherly phrases like "my daughter," "my dear," "mama understands"
- Be culturally sensitive to Kenyan context
- Keep responses SHORT (2-4 sentences maximum)

Important rules:
- NEVER give medical diagnoses or prescribe treatments
- For medical concerns, always say "Please talk to a doctor or nurse about this"
- For serious issues (abuse, violence, depression), direct them to call the hotlines in the Help Centre
- Focus on emotional support, general health education, and practical advice
- Topics you can discuss: puberty, periods, body changes, emotions, friendships, self-care, hygiene, relationships, school stress
- Be honest when you don't know something

If asked about medical symptoms, severe pain, or serious mental health issues, respond with care but direct them to professional help.`
        },
        { role: "user", content: userQuestion },
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const answer = completion.choices[0].message.content;

    res.json({ 
      success: true, 
      answer: answer 
    });

  } catch (error) {
    console.error("Mama Bot Error:", error);
    res.json({ 
      success: false, 
      error: "Mama cannot respond right now. Please try again in a moment." 
    });
  }
});

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sauti Ya Mama - Conversation starters for mum & daughter</title>
  <style>
* { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: url('background.jpg') no-repeat center center fixed;
      background-size: cover;
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: brightness(1.05) saturate(1.2);
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(230, 130, 180, 0.3);
    }
    h1 {
      text-align: center;
      color: #8b5cf6;
      font-size: 28px;
      margin-bottom: 10px;
    }
    .subtitle {
      text-align: center;
      color: #ec4899;
      font-style: italic;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .topics-grid {
      display: grid;
      gap: 15px;
      margin-bottom: 20px;
    }
    .topic-btn {
      background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%);
      color: white;
      border: none;
      padding: 20px;
      border-radius: 15px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
    }
    .topic-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
    }
    .topic-btn:active {
      transform: translateY(0);
    }
    .topic-btn.emergency {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    }
    .topic-btn.safe-exit {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }
    .topic-btn.ai-bot {
      background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%));
    }
    .content-card {
      display: none;
      background: #fef3f7;
      border-radius: 15px;
      padding: 25px;
      margin-bottom: 20px;
    }
    .content-card.active {
      display: block;
      animation: fadeIn 0.5s;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .section {
      margin-bottom: 20px;
      padding: 15px;
      background: white;
      border-radius: 10px;
      border-left: 4px solid #ec4899;
    }
    .section-title {
      color: #8b5cf6;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .section-text {
      color: #374151;
      line-height: 1.6;
      font-size: 15px;
    }
    .hotline-item {
      background: #f3e8ff;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .hotline-name {
      font-weight: 700;
      color: #8b5cf6;
      font-size: 15px;
      margin-bottom: 5px;
    }
    .hotline-number {
      color: #059669;
      font-weight: 600;
      font-size: 16px;
    }
    .hotline-desc {
      color: #6b7280;
      font-size: 13px;
      margin-top: 3px;
    }
    .mama-bot-input {
      width: 100%;
      padding: 15px;
      border: 2px solid #ec4899;
      border-radius: 10px;
      font-size: 15px;
      margin-bottom: 15px;
      resize: vertical;
      font-family: inherit;
    }
    .mama-bot-input:focus {
      outline: none;
      border-color: #a855f7;
    }
    .mama-response {
      background: white;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #ec4899;
      margin-top: 20px;
      display: none;
    }
    .mama-response.active {
      display: block;
      animation: fadeIn 0.5s;
    }
    .loading {
      text-align: center;
      color: #8b5cf6;
      font-style: italic;
      padding: 20px;
    }
    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .btn {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-back {
      background: #e5e7eb;
      color: #374151;
    }
    .btn-back:hover {
      background: #d1d5db;
    }
    .btn-voice {
      background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
    }
    .btn-voice:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
    }
    .btn-voice:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn-ask {
      background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    .btn-ask:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
    .btn-ask:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .footer {
      text-align: center;
      color: #8b5cf6;
      font-size: 13px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #fce7f3;
    }
    .analytics-link {
      text-align: center;
      margin-top: 15px;
    }
    .analytics-link a {
      color: #a855f7;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
    .analytics-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="logo.png" alt="Sauti Ya Mama Logo" style="display:block; margin:0 auto 15px; width:90px; height:auto;">
    <h1>Sauti Ya Mama</h1>
    <div style="text-align:center; margin-bottom:10px;">
      <svg width="60" height="10">
        <circle cx="10" cy="5" r="3" fill="#ec4899"/>
        <circle cx="30" cy="5" r="3" fill="#a855f7"/>
        <circle cx="50" cy="5" r="3" fill="#ec4899"/>
      </svg>
    </div>
    <p class="subtitle">Conversation Starters for Mum & Daughter</p>

    <div id="menu" class="topics-grid">
      <button class="topic-btn" onclick="showTopic('menstrual-health')">
        Menstrual Health
      </button>
      <button class="topic-btn" onclick="showTopic('body-changes')">
        Body Changes
      </button>
      <button class="topic-btn" onclick="showTopic('relationships')">
        Relationships
      </button>
      <button class="topic-btn" onclick="showTopic('health-safety')">
        Health & Safety
      </button>
      <button class="topic-btn" onclick="showTopic('emotional-care')">
        Emotional Care
      </button>
      <button class="topic-btn ai-bot" onclick="showMamaBot()">
        Mama Bot (AI)
      </button>
      <button class="topic-btn emergency" onclick="showTopic('help-centre')">
        Help Centre
      </button>
      <button class="topic-btn safe-exit" onclick="quickExit()">
        Quick Exit
      </button>
    </div>

    <div id="content-area"></div>

    <div class="analytics-link">
      <a href="/analytics">View Analytics</a>
    </div>

    <div class="footer">
      Future USSD Version Coming Soon
    </div>
  </div>

  <script>
    const topics = {
      'menstrual-health': {
        title: 'Menstrual Health',
        sections: [
          {
            title: "Mama Speaks",
            text: "My daughter, your period shows your body is healthy and growing. Don't be ashamed — it's part of being a woman."
          },
          {
            title: "Mama's Wisdom",
            text: "A pad pouch helps your daughter stay ready — include two pads, tissue, wet wipes, and a clean panty. Remind her to change pads every 4–6 hours and to dry underwear in sunlight."
          },
          {
            title: "Ask Her",
            text: "Can you tell when your period is about to start?"
          },
          {
            title: "Try Together",
            text: "Make a small pouch together with pads and tissue, then teach her how to clean up properly."
          }
        ]
      },
      'body-changes': {
        title: 'Body Changes',
        sections: [
          {
            title: "Mama's Wisdom",
            text: "You might start to notice some white or clear discharge in your panty. This is completely normal and is how your vagina keeps itself clean and healthy. But if it ever itches, has a bad smell, or looks yellow or green, please tell me so we can see a doctor."
          },
          {
            title: "Mama Speaks",
            text: "Changes like pimples, hair growth, and mood swings are normal. Keep clean by washing your face and body, and wear fresh clothes."
          },
          {
            title: "Mama Speaks",
            text: "Your body is beautiful just as it is. Everyone grows differently, so be proud of your body."
          },
          {
            title: "Ask Her",
            text: "What change surprised or excited you most?"
          },
          {
            title: "Try Together",
            text: "Make a 'daily care list' — wash face, brush teeth, drink water, and smile!"
          }
        ]
      },
      'relationships': {
        title: 'Relationships',
        sections: [
          {
            title: "Mama's Wisdom",
            text: "True friends make you better; jealousy and gossip break hearts. Teach her that forgiveness and kindness make friendships last."
          },
          {
            title: "Mama Speaks",
            text: "A good friend lifts you up. A true friend is a blessing — they light your way."
          },
          {
            title: "Mama's Wisdom",
            text: "As you bloom, your hormones will make you start to feel more attracted to boys. You might even feel 'butterflies.' This is normal. But having a boyfriend at a young age is not a must. It's best to wait until you can have an open relationship without straining things with your parents."
          },
          {
            title: "Mama Speaks",
            text: "A boyfriend is not needed to feel special. You are special because of who you are, not who likes you."
          },
          {
            title: "Ask Her",
            text: "Who makes you feel safe and happy?"
          },
          {
            title: "Try Together",
            text: "Draw or write one good thing about your best friend."
          }
        ]
      },
      'health-safety': {
        title: 'Health & Safety',
        sections: [
          {
            title: "Mama's Wisdom",
            text: "Some people online pretend to be friends. Remind her not to share photos or secrets with strangers. Her value is in her heart, not her likes."
          },
          {
            title: "Mama Speaks",
            text: "Your worth is inside you, not in likes or online validation."
          },
          {
            title: "Ask Her",
            text: "What makes you feel peaceful when you are offline?"
          },
          {
            title: "Try Together",
            text: "Have one evening without phones — talk, sing, or cook together."
          }
        ]
      },
      'emotional-care': {
        title: 'Emotional Care',
        sections: [
          {
            title: "Mama's Wisdom",
            text: "During adolescence, moods swing up and down. When she's upset, stay calm — hug her, don't shout."
          },
          {
            title: "Mama Speaks",
            text: "It's okay to cry sometimes, my daughter. Even the sky rains, but it always clears."
          },
          {
            title: "Ask Her",
            text: "What makes you feel better when you're sad?"
          },
          {
            title: "Try Together",
            text: "Practice slow breathing — breathe in, hold, breathe out — or journal feelings in a small notebook."
          }
        ]
      },
      'help-centre': {
        title: 'Help Centre - Emergency Contacts',
        hotlines: [
          {
            name: 'National Gender Violence Hotline',
            number: '1195',
            location: 'Kenya (Toll-Free)',
            description: 'Report gender-based violence, get counseling and support'
          },
          {
            name: 'Childline Kenya',
            number: '116',
            location: 'Kenya (Toll-Free)',
            description: 'Child protection and counseling services'
          },
          {
            name: 'LVCT Health - HIV Support',
            number: '1190',
            location: 'Kenya (Toll-Free)',
            description: 'HIV testing, counseling, and support services'
          },
          {
            name: 'Police Emergency',
            number: '999 / 112',
            location: 'Kenya',
            description: 'Report crimes including rape and assault'
          },
          {
            name: 'Coast General Hospital',
            number: '041-231 4012',
            location: 'Mombasa',
            description: 'Emergency medical services and gender-based violence care'
          },
          {
            name: 'Kilifi County Hospital',
            number: '041-522 2063',
            location: 'Kilifi',
            description: 'Medical emergencies and counseling services'
          },
          {
            name: 'LVCT Health Mombasa',
            number: '0729 471 000',
            location: 'Mombasa',
            description: 'HIV/AIDS counseling and testing services'
          },
          {
            name: 'FIDA Kenya - Legal Aid',
            number: '0800 720 187',
            location: 'Kenya (Toll-Free)',
            description: 'Free legal aid for women and girls'
          }
        ]
      }
    };

    let currentTopic = null;
    let isSpeaking = false;

    function showTopic(topicId) {
      currentTopic = topicId;
      const topic = topics[topicId];
      
      fetch('/api/track/' + topicId, { method: 'POST' });

      document.getElementById('menu').style.display = 'none';

      let html = '<div class="content-card active">';
      html += '<h2 style="color: #8b5cf6; margin-bottom: 20px; font-size: 20px;">' + topic.title + '</h2>';
      
      if (topic.hotlines) {
        html += '<div class="section">';
        html += '<div class="section-text" style="margin-bottom: 15px;">If you or someone you know needs help, these numbers are available 24/7. You are not alone.</div>';
        html += '</div>';
        
        topic.hotlines.forEach(hotline => {
          html += '<div class="hotline-item">';
          html += '<div class="hotline-name">' + hotline.name + '</div>';
          html += '<div class="hotline-number">📞 ' + hotline.number + '</div>';
          html += '<div class="hotline-desc">' + hotline.location + ' - ' + hotline.description + '</div>';
          html += '</div>';
        });
        
        html += '<div class="btn-group">';
        html += '<button class="btn btn-back" onclick="goBack()">Back</button>';
        html += '</div>';
      } else {
        topic.sections.forEach(section => {
          html += '<div class="section">';
          html += '<div class="section-title">' + section.title + '</div>';
          html += '<div class="section-text">' + section.text + '</div>';
          html += '</div>';
        });

        html += '<div class="btn-group">';
        html += '<button class="btn btn-back" onclick="goBack()">Back</button>';
        html += '<button class="btn btn-voice" id="voiceBtn" onclick="speakContent()">Hear Mama</button>';
        html += '</div>';
      }
      
      html += '</div>';

      document.getElementById('content-area').innerHTML = html;
    }

    function showMamaBot() {
      fetch('/api/track/mama-bot', { method: 'POST' });
      
      document.getElementById('menu').style.display = 'none';

      let html = '<div class="content-card active">';
      html += '<h2 style="color: #3b82f6; margin-bottom: 20px; font-size: 20px;">Mama Bot (AI)</h2>';
      
      html += '<div class="section">';
      html += '<div class="section-title">Ask Mama Anything</div>';
      html += '<div class="section-text">I am here to listen and help, my dear. Ask me about puberty, periods, body changes, emotions, friendships, or anything on your mind. Remember, for medical concerns, please see a doctor.</div>';
      html += '</div>';

      html += '<textarea class="mama-bot-input" id="questionInput" rows="4" placeholder="Type your question here... (e.g., Why do I feel sad sometimes? What is puberty?)"></textarea>';
      
      html += '<button class="btn btn-ask" id="askBtn" onclick="askMamaBot()">Ask Mama</button>';
      
      html += '<div class="mama-response" id="mamaResponse"></div>';
      
      html += '<div class="btn-group" style="margin-top: 20px;">';
      html += '<button class="btn btn-back" onclick="goBack()">Back</button>';
      html += '</div>';
      html += '</div>';

      document.getElementById('content-area').innerHTML = html;
    }

    async function askMamaBot() {
      const questionInput = document.getElementById('questionInput');
      const askBtn = document.getElementById('askBtn');
      const responseDiv = document.getElementById('mamaResponse');
      
      const question = questionInput.value.trim();
      
      if (!question) {
        alert('Please type a question first, my dear.');
        return;
      }

      askBtn.disabled = true;
      askBtn.textContent = 'Mama is thinking...';
      responseDiv.innerHTML = '<div class="loading">Mama is thinking about your question...</div>';
      responseDiv.classList.add('active');

      try {
        const response = await fetch('/api/mama-bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: question })
        });

        const data = await response.json();

        if (data.success) {
          responseDiv.innerHTML = '<div class="section-title">Mama Says:</div><div class="section-text">' + data.answer + '</div>';
        } else {
          responseDiv.innerHTML = '<div class="section-text" style="color: #dc2626;">' + (data.error || 'Sorry, Mama cannot respond right now. Please try again.') + '</div>';
        }
      } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = '<div class="section-text" style="color: #dc2626;">Connection error. Please check your internet and try again.</div>';
      }

      askBtn.disabled = false;
      askBtn.textContent = 'Ask Mama';
      questionInput.value = '';
    }

    function goBack() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      document.getElementById('menu').style.display = 'grid';
      document.getElementById('content-area').innerHTML = '';
      isSpeaking = false;
    }

    function quickExit() {
      window.location.replace('https://www.google.com');
    }

    function speakContent() {
      if (!('speechSynthesis' in window)) {
        alert('Speech synthesis not supported in your browser.');
        return;
      }

      const voiceBtn = document.getElementById('voiceBtn');
      
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        voiceBtn.textContent = 'Hear Mama';
        isSpeaking = false;
        return;
      }

      const topic = topics[currentTopic];
      let fullText = '';
      
      topic.sections.forEach(section => {
        fullText += section.title + '. ' + section.text + '. ';
      });

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        v.name.includes('Female') || 
        v.name.includes('Samantha') || 
        v.name.includes('Karen') ||
        v.name.includes('Victoria') ||
        v.gender === 'female'
      );
      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.onstart = () => {
        isSpeaking = true;
        voiceBtn.textContent = 'Stop';
        voiceBtn.disabled = false;
      };

      utterance.onend = () => {
        isSpeaking = false;
        voiceBtn.textContent = 'Hear Mama';
      };

      utterance.onerror = () => {
        isSpeaking = false;
        voiceBtn.textContent = 'Hear Mama';
      };

      window.speechSynthesis.speak(utterance);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // Allow Enter key to submit in Mama Bot
    document.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        const questionInput = document.getElementById('questionInput');
        if (questionInput && document.activeElement === questionInput) {
          e.preventDefault();
          askMamaBot();
        }
      }
    });
  </script>
</body>
</html>
  `);
});

app.get('/analytics', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Analytics - Sauti Ya Mama</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a18cd1 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 {
      text-align: center;
      color: #8b5cf6;
      font-size: 26px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: linear-gradient(135deg, #fef3f7 0%, #f3e8ff 100%);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #ec4899;
    }
    .stat-label {
      color: #374151;
      font-weight: 600;
      font-size: 15px;
    }
    .stat-value {
      color: #8b5cf6;
      font-size: 28px;
      font-weight: 700;
    }
    .back-link {
      text-align: center;
      margin-top: 25px;
    }
    .back-link a {
      color: #a855f7;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
    }
    .back-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Topic Views</h1>
    <div id="stats"></div>
    <div class="back-link">
      <a href="/">Back to Topics</a>
    </div>
  </div>

  <script>
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        const labels = {
          'menstrual-health': 'Menstrual Health',
          'body-changes': 'Body Changes',
          'relationships': 'Relationships',
          'health-safety': 'Health & Safety',
          'emotional-care': 'Emotional Care',
          'mama-bot': 'Mama Bot (AI)',
          'help-centre': 'Help Centre',
          };

    let html = '';
    for (let key in data) {
      const label = labels[key];
      html += '<div class="stat-card">';
      html += '<div class="stat-label">' + label + '</div>';
      html += '<div class="stat-value">' + data[key] + '</div>';
      html += '</div>';
    }
    document.getElementById('stats').innerHTML = html;
  });
  </script>
</body>
</html>
  `);
});
app.listen(PORT, () => {
console.log('Sauti Ya Mama running on http://localhost:' + PORT);
});