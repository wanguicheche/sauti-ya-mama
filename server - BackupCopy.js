const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (like your logo)
app.use(express.static(__dirname));

const analytics = {
  'menstrual-health': 0,
  'body-changes': 0,
  'relationships': 0,
  'health-safety': 0,
  'emotional-care': 0
};

app.use(express.json());

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
      html += '</div>';

      document.getElementById('content-area').innerHTML = html;
    }

    function goBack() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      document.getElementById('menu').style.display = 'grid';
      document.getElementById('content-area').innerHTML = '';
      isSpeaking = false;
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
// PRIORITY LIST OF FEMALE VOICES ACROSS DEVICES
const preferredVoices = [
  "Google UK English Female",   // Chrome desktop
  "Google US English Female",   // Chrome desktop
  "Samantha",     // iOS / Mac
  "Victoria",     // iOS
  "Karen",        // iOS / Mac
  "Tessa",        // SA Female
  "Moira"         // Irish Female
];

let selectedVoice = null;

// Step 1: Try to match a known female voice by exact name
for (const name of preferredVoices) {
  const match = voices.find(v => v.name === name);
  if (match) {
    selectedVoice = match;
    break;
  }
}
// Step 2: Fallback — pick the first voice that sounds female
if (!selectedVoice) {
  selectedVoice = voices.find(v =>
    /female|woman|girl/i.test(v.name)
  );
}

// Step 3: If we found a female voice, use it
if (selectedVoice) 
{utterance.voice = selectedVoice;
    }
  </script>
</body>
</html>
  `);
});

window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

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
          'emotional-care': 'Emotional Care'
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