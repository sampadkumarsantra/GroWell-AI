# 🌱 GroWell AI

### Cultivating Intelligence. Growing Possibilities.

**GroWell AI** is an AI-powered agricultural intelligence platform designed to help farmers make smarter, faster, and more informed farming decisions.

It brings **AI agricultural assistance, crop disease diagnosis, soil intelligence, weather intelligence, market analytics, multilingual interaction, and agricultural knowledge** together in one farmer-centric platform.

> **From information to insight. From insight to action.**

---

## 🌾 Our Vision

Agriculture is full of complex decisions.

Farmers need to understand their crops, soil, weather, irrigation requirements, diseases, pests, nutrients, and market conditions — often without having immediate access to agricultural experts.

**GroWell AI aims to bridge this gap.**

Our vision is to build an intelligent agricultural companion that can understand a farmer's:

- 🌱 Crop
- 🧪 Soil condition
- 🌦️ Weather
- 📍 Location
- 📊 Market situation
- 🗣️ Language
- 👨‍🌾 Farming requirements

and convert these different sources of information into **clear, practical, and actionable agricultural recommendations**.

---

# 🚜 The Problem

Farmers frequently face challenges such as:

- Limited access to agricultural experts
- Difficulty identifying crop diseases
- Unpredictable weather
- Complex fertilizer and nutrient decisions
- Irrigation uncertainty
- Fragmented agricultural information
- Language barriers
- Difficulty understanding market conditions
- Lack of personalized agricultural decision support

Agricultural information may exist, but the real challenge is often **turning information into the right decision at the right time**.

GroWell AI is being developed to address this challenge.

---

# 💡 Our Solution

GroWell AI brings multiple agricultural intelligence capabilities into a single platform.

Instead of requiring farmers to search through multiple applications and information sources, GroWell AI aims to provide a unified agricultural decision-support experience.

### 🌱 Crop + 🧪 Soil + 🌦️ Weather + 📊 Market + 🤖 AI

These signals can be combined to generate more meaningful agricultural insights.

---

# ✨ Key Features

## 🤖 AI Agricultural Assistant

GroWell AI provides an agriculture-focused conversational assistant.

Farmers can ask questions about:

- Crop management
- Fertilization
- Irrigation
- Pest management
- Disease management
- Crop selection
- Farming practices
- Nutrient management
- General agricultural problems

The assistant is designed to provide information in a simple and farmer-friendly manner.

---

## 🌿 AI Crop Disease Diagnosis

Farmers can upload an image of a crop or plant for AI-assisted analysis.

The diagnosis system can provide information such as:

- Crop identification
- Possible disease
- Confidence
- Symptoms
- Possible causes
- Treatment recommendations
- Preventive measures

This can help farmers obtain an initial assessment before consulting an agricultural professional when necessary.

> **Note:** AI diagnosis should be treated as decision-support information and not as a replacement for professional agricultural diagnosis.

---

## 🌦️ Weather Intelligence

Weather information is transformed into agricultural insights rather than being presented only as raw weather data.

The weather module can provide:

- Current temperature
- Humidity
- Wind conditions
- Rainfall
- Forecast information
- Disease-risk insights
- Irrigation recommendations

This helps connect **weather conditions with farming decisions**.

---

## 🧪 Soil Intelligence

GroWell AI provides soil analysis using agricultural parameters such as:

- Soil pH
- Electrical conductivity (EC)
- Organic carbon
- Nitrogen
- Phosphorus
- Potassium
- Soil type
- Crop
- Growth stage

The system uses these inputs to generate agricultural insights and recommendations.

---

## 📊 Agricultural Market Analytics

GroWell AI includes a market analytics module designed to help farmers understand agricultural price conditions.

The analytics system can work with market data to provide information such as:

- Current price
- Average price
- Highest price
- Lowest price
- Price volatility
- Market trends

The long-term goal is to provide increasingly real-time and location-aware market intelligence.

---

## 📚 Agricultural Knowledge Library

GroWell AI includes a structured agricultural knowledge library.

It contains information related to:

- 🌿 Crop diseases
- 🐛 Pests
- 🧪 Nutrient deficiencies
- 🌱 Crop-specific problems
- 🚜 Agricultural practices

The library is designed to provide quick access to useful agricultural information without requiring an AI conversation for every question.

---

## 🌍 Multilingual Agricultural Assistance

Language should never be a barrier to agricultural knowledge.

GroWell AI is designed to support multiple languages, including:

- English
- Hindi
- Bengali
- Telugu
- Tamil
- Kannada
- Malayalam
- Marathi
- Gujarati
- Punjabi
- Odia
- Urdu

The platform also includes a foundation for multilingual translation and browser-based voice interaction.

---

## 🎙️ Voice Interaction

GroWell AI supports browser-based speech recognition where supported by the user's browser.

This enables farmers to interact with the assistant using their voice instead of relying entirely on typing.

The long-term objective is to make agricultural AI accessible even to users with limited digital literacy.

---

# 🏗️ System Architecture

GroWell AI follows a client-server architecture.

```text
                         ┌───────────────────┐
                         │      FARMER       │
                         └─────────┬─────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │      GroWell AI UI       │
                    │       React + Vite       │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        ┌──────────┐       ┌────────────┐      ┌──────────┐
        │ AI Chat  │       │ Crop       │      │ Weather  │
        │          │       │ Diagnosis  │      │          │
        └────┬─────┘       └─────┬──────┘      └────┬─────┘
             │                   │                  │
             └───────────────────┼──────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Node.js + Express    │
                    │       Backend API        │
                    └────────────┬─────────────┘
                                 │
        ┌────────────┬───────────┼───────────┬────────────┐
        │            │           │           │            │
        ▼            ▼           ▼           ▼            ▼
   ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌────────┐ ┌─────────┐
   │ AI      │ │ Gemini   │ │ Weather │ │ Soil   │ │ Market  │
   │ Engine  │ │ Vision   │ │ Service │ │ Engine │ │ Service │
   └─────────┘ └──────────┘ └─────────┘ └────────┘ └─────────┘
        │            │           │           │            │
        └────────────┴───────────┴───────────┴────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Agricultural Intelligence│
                    │ & Decision Support       │
                    └──────────────────────────┘
```

---

# 🧩 Core Modules

| Module | Purpose |
|---|---|
| 🤖 AI Chat | Conversational agricultural assistance |
| 🌿 Crop Diagnosis | AI-assisted crop image analysis |
| 🌦️ Weather | Weather and agricultural weather intelligence |
| 🧪 Soil Health | Soil and nutrient analysis |
| 📊 Analytics | Agricultural market analytics |
| 📚 Library | Agricultural knowledge repository |
| ⚙️ Settings | Language and user preferences |
| 🔐 Authentication | Farmer registration and login |

---

# 🛠️ Technology Stack

## Frontend

- **React**
- **Vite**
- **JavaScript**
- **CSS**
- **React Markdown**
- **Lucide React**

## Backend

- **Node.js**
- **Express.js**
- **REST APIs**
- **Multer**
- **Axios**

## Artificial Intelligence

- **Groq / LLM integration** for conversational agricultural assistance
- **Google Gemini Vision** for crop image analysis

## Weather & External Data

- **Open-Meteo** for weather and forecast information
- Agricultural market data integrations

## Database

- **SQLite**

## Development Tools

- **Git**
- **GitHub**
- **VS Code**
- **npm**

---

# 📁 Project Structure

```text
GroWell AI/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Chat/
│       │   ├── Header/
│       │   ├── Sidebar/
│       │   └── Weather/
│       │
│       ├── context/
│       ├── data/
│       ├── pages/
│       │   ├── Auth/
│       │   ├── Intro/
│       │   ├── Analytics.jsx
│       │   ├── CropDiagnosis.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Library.jsx
│       │   ├── Settings.jsx
│       │   ├── SoilHealth.jsx
│       │   └── Weather.jsx
│       │
│       ├── services/
│       └── styles/
│
├── database/
│   └── database.js
│
├── routes/
│   ├── auth.js
│   ├── chat.js
│   ├── decision.js
│   ├── diagnose.js
│   ├── market.js
│   ├── soil.js
│   ├── translate.js
│   └── weather.js
│
├── services/
│   ├── agricultureEngine.js
│   ├── ai.js
│   ├── geminiVision.js
│   ├── growellDecision.js
│   ├── marketService.js
│   ├── soilAnalysis.js
│   └── weatherService.js
│
├── public/
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

- **Node.js**
- **npm**
- **Git**

---

## 1. Clone the Repository

```bash
git clone https://github.com/sampadkumarsantra/GroWell-AI.git
```

Then enter the project:

```bash
cd GroWell-AI
```

---

## 2. Install Backend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd client
npm install
```

Return to the project root:

```bash
cd ..
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

GROQ_API_KEY=your_groq_api_key

GEMINI_API_KEY=your_gemini_api_key
```

### ⚠️ Important

**Never commit `.env` to GitHub.**

API keys and other secrets must remain private.

The project's `.gitignore` should exclude:

```text
.env
```

If an API key is accidentally exposed, revoke it immediately and generate a new key.

---

# ▶️ Running the Application

## Start the Backend

From the project root:

```bash
node server.js
```

The backend should run on:

```text
http://localhost:3000
```

---

## Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will display the local development URL.

Typically:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 🔌 API Structure

The backend exposes multiple agricultural services.

```text
/api/auth
/api/chat
/api/diagnose
/api/decision
/api/market
/api/soil
/api/translate
/api/weather
```

Each route is responsible for a specific part of the GroWell AI platform.

---

# 📸 Screenshots

Screenshots will be added as the platform continues to evolve.

## 🏠 Dashboard

> Add a screenshot of the main GroWell AI dashboard here.

```text
[ Dashboard Screenshot ]
```

---

## 🤖 AI Agricultural Assistant

> Add a screenshot showing a farmer interacting with GroWell AI.

```text
[ AI Chat Screenshot ]
```

---

## 🌿 Crop Disease Diagnosis

> Add a screenshot of the crop diagnosis interface.

```text
[ Crop Diagnosis Screenshot ]
```

---

## 🌦️ Weather Intelligence

> Add a screenshot of the weather intelligence page.

```text
[ Weather Screenshot ]
```

---

## 🧪 Soil Intelligence

> Add a screenshot of the soil health analysis page.

```text
[ Soil Health Screenshot ]
```

---

## 📊 Market Analytics

> Add a screenshot of the agricultural analytics dashboard.

```text
[ Analytics Screenshot ]
```

---

# 🚀 Future Roadmap

GroWell AI is being developed toward a larger agricultural intelligence ecosystem.

## Phase 1 — Core Platform

- [x] Farmer authentication
- [x] AI agricultural chat
- [x] Crop image diagnosis
- [x] Weather intelligence
- [x] Soil analysis
- [x] Agricultural knowledge library
- [x] Multilingual foundation
- [x] Voice input
- [x] Market analytics foundation

---

## Phase 2 — Personalized Farm Intelligence

- [ ] Farmer-specific farm profiles
- [ ] Crop lifecycle tracking
- [ ] Personalized irrigation schedules
- [ ] Personalized fertilizer recommendations
- [ ] Crop health history
- [ ] Farm activity tracking
- [ ] Improved agricultural decision engine

---

## Phase 3 — Real-Time Agricultural Intelligence

- [ ] Real-time market data
- [ ] Location-aware recommendations
- [ ] Hyperlocal weather intelligence
- [ ] Pest and disease outbreak alerts
- [ ] Agricultural risk prediction
- [ ] Government scheme discovery
- [ ] Agricultural notification system

---

## Phase 4 — Advanced AI Agriculture

- [ ] Satellite-based crop monitoring
- [ ] Remote sensing integration
- [ ] Field-level crop health mapping
- [ ] AI-powered yield prediction
- [ ] Crop stress detection
- [ ] Soil fertility forecasting
- [ ] Predictive disease intelligence

---

## Phase 5 — Connected Farmer Ecosystem

The long-term goal is to create a complete digital agricultural companion connecting:

```text
                         FARMER
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    AI Advisor         Crop Health           Soil
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
      Weather            Markets          Government
        │                   │                Schemes
        └───────────────────┼───────────────────┘
                            │
                            ▼
                   FARM INTELLIGENCE
                            │
                            ▼
                  BETTER DECISIONS
                            │
                            ▼
                  BETTER FARMING
```

---

# 🎯 Why GroWell AI?

GroWell AI is not intended to be just another chatbot.

The goal is to transform fragmented agricultural information into **practical decision support**.

Instead of asking farmers to independently interpret:

- Weather data
- Soil parameters
- Crop symptoms
- Market prices
- Agricultural knowledge

GroWell AI aims to bring these signals together.

### Crop + Soil + Weather + Market + AI

↓

### Agricultural Intelligence

↓

### Actionable Decisions

---

# 🌱 Our Long-Term Vision

> **A future where every farmer has access to an intelligent agricultural companion.**

GroWell AI aims to make agricultural intelligence:

**Accessible.**

**Understandable.**

**Multilingual.**

**Actionable.**

And ultimately, **farmer-centric.**

---

# 👥 Team

## Team NG Frontiers

**Sampad Kumar Santra**  
**Debarghya Maiti**  
**Ankita Kumari**

---

# 🏆 Project

**GroWell AI — AI-Powered Agricultural Intelligence Platform**

Built with the vision of making advanced agricultural intelligence more accessible to farmers.

---

# 📄 License

GroWell AI is currently under active development.

License information will be added as the project moves toward public release.

---

# 🌱 GroWell AI

### Cultivating Intelligence. Growing Possibilities.

**AI for Agriculture • Intelligence for Farmers • Technology for a Better Future**