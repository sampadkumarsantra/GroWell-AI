# 🌱 GroWell AI

### Intelligent Agricultural Assistance for Smarter Farming

GroWell AI is an AI-powered agricultural companion designed to help farmers make better, faster, and more informed farming decisions.

It brings **AI advisory, crop disease diagnosis, weather intelligence, soil analysis, market insights, multilingual assistance, and agricultural knowledge** together in one platform.

> **Grow smarter. Farm better.**

---

## 🚜 Project Vision

Agriculture involves hundreds of decisions every season — from selecting crops and managing soil to irrigation, disease control, weather preparedness, and market planning.

However, farmers often face challenges such as:

- Limited access to agricultural experts
- Difficulty identifying crop diseases
- Unpredictable weather conditions
- Complex soil and nutrient management
- Lack of timely agricultural information
- Language and accessibility barriers
- Difficulty interpreting market information

**GroWell AI aims to bridge this gap by putting an intelligent agricultural assistant directly in the farmer's hands.**

The long-term vision is to build a comprehensive **AI-powered farming decision-support platform** capable of understanding a farmer's crop, field conditions, location, language, and farming requirements.

---

# ✨ Key Features

## 🤖 AI Agricultural Assistant

Farmers can communicate with GroWell AI through natural language and receive agriculture-focused guidance.

The assistant can help with:

- Crop management
- Fertilization
- Irrigation
- Pest and disease management
- Crop selection
- Farming practices
- General agricultural questions

---

## 🌿 Crop Disease Diagnosis

Farmers can upload an image of a crop or plant.

GroWell AI analyzes the image and provides information such as:

- Crop identification
- Possible disease
- Confidence
- Symptoms
- Possible causes
- Treatment recommendations
- Preventive measures

This allows farmers to obtain an initial AI-assisted diagnosis without requiring immediate access to an agricultural expert.

---

## 🌦️ Weather Intelligence

GroWell AI integrates weather information into agricultural decision-making.

The weather module provides information such as:

- Current temperature
- Humidity
- Wind conditions
- Rainfall
- Forecast information
- Agricultural disease risk
- Irrigation guidance

Weather information can therefore be translated into **actionable farming advice**, rather than simply displaying weather numbers.

---

## 🧪 Soil Intelligence

GroWell AI provides soil analysis based on agricultural parameters such as:

- Soil pH
- Electrical conductivity
- Organic carbon
- Nitrogen
- Phosphorus
- Potassium
- Crop
- Growth stage
- Soil type

The system uses these parameters to generate agricultural insights and recommendations.

---

## 📊 Market Analytics

The platform includes agricultural market analytics designed to help farmers understand market conditions.

The system can work with agricultural price information to provide insights such as:

- Current price
- Average price
- Highest price
- Lowest price
- Price volatility
- Market trends

---

## 📚 Agricultural Knowledge Library

GroWell AI includes an agricultural knowledge library containing structured information about:

- Crop diseases
- Pests
- Nutrient deficiencies
- Crop-specific problems
- Agricultural practices

The library is designed to provide useful information even when continuous AI interaction is not required.

---

## 🌍 Multilingual Support

Agriculture is multilingual.

GroWell AI is designed to support communication across multiple languages, including Indian languages such as:

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

The platform also supports voice-based interaction where browser speech recognition is available.

---

## 👨‍🌾 Farmer-Centric Experience

GroWell AI is designed around the farmer rather than around the technology.

The platform includes:

- Farmer registration
- Personalized user information
- Agricultural dashboard
- AI chat
- Image upload
- Voice input
- Agricultural modules
- Personalized settings
- Centralized navigation

---

# 🏗️ System Architecture

GroWell AI follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │      FARMER          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   GroWell AI UI      │
                    │   React + Vite       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          AI Chat        Crop Diagnosis      Weather
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js / Express  │
                    │      Backend API     │
                    └──────────┬───────────┘
                               │
       ┌───────────────┬───────┼────────┬───────────────┐
       │               │       │        │               │
       ▼               ▼       ▼        ▼               ▼
    AI Engine       Gemini   Weather   Soil          Market
                    Vision    API      Engine        Services
       │               │       │        │               │
       └───────────────┴───────┴────────┴───────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Agricultural Advice  │
                    │ & Decision Support    │
                    └──────────────────────┘
```

---

# 🧩 Core Modules

| Module            | Purpose                                       |
| ----------------- | --------------------------------------------- |
| 🤖 AI Chat        | Agricultural conversational assistant         |
| 🌿 Crop Diagnosis | Image-based crop disease analysis             |
| 🌦️ Weather       | Weather and agricultural weather intelligence |
| 🧪 Soil Health    | Soil and nutrient analysis                    |
| 📊 Analytics      | Agricultural market analytics                 |
| 📚 Library        | Agricultural knowledge repository             |
| ⚙️ Settings       | Language, preferences and farmer settings     |
| 🔐 Authentication | Farmer registration and login                 |

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
- **Multer** for image uploads
- **Axios** for external API requests

## Artificial Intelligence

- **Groq / LLM integration** for conversational agricultural assistance
- **Google Gemini Vision** for crop image analysis

## Data & Agricultural Services

- **Open-Meteo** for weather and forecast information
- Agricultural market data integrations
- Local agricultural knowledge datasets

## Database

- **SQLite**

## Development

- Git
- GitHub
- VS Code
- npm

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
│       │   ├── Library.jsx
│       │   ├── Settings.jsx
│       │   └── SoilHealth.jsx
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
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

# ⚙️ Local Setup

## 1. Clone the repository

```bash
git clone https://github.com/sampadkumarsantra/GroWell-AI.git
cd GroWell-AI
```

---

## 2. Install backend dependencies

```bash
npm install
```

---

## 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

---

## 4. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

GROQ_API_KEY=your_groq_api_key

GEMINI_API_KEY=your_gemini_api_key
```

**Never commit&#x20;****`.env`****&#x20;or API keys to GitHub.**

The repository should keep `.env` excluded through `.gitignore`.

---

# ▶️ Running GroWell AI

## Start the backend

From the project root:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

---

## Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will provide the local development address in the terminal, typically:

```text
http://localhost:5173
```

---

# 🔐 Security

GroWell AI uses environment variables for sensitive API credentials.

Do not upload:

```text
.env
API keys
private credentials
production secrets
```

to GitHub.

If an API key is accidentally exposed, revoke it and generate a new one immediately.

---

# 📸 Screenshots

Screenshots will be added here as the interface evolves.

### 🏠 Dashboard

```text
[ Add Dashboard Screenshot ]
```

### 🤖 AI Agricultural Assistant

```text
[ Add Chat Screenshot ]
```

### 🌿 Crop Disease Diagnosis

```text
[ Add Crop Diagnosis Screenshot ]
```

### 🌦️ Weather Intelligence

```text
[ Add Weather Screenshot ]
```

### 🧪 Soil Intelligence

```text
[ Add Soil Health Screenshot ]
```

### 📊 Market Analytics

```text
[ Add Analytics Screenshot ]
```

---

# 🗺️ Future Roadmap

GroWell AI is being developed toward a larger agricultural intelligence platform.

## Phase 1 — Core Platform

- [x] Farmer authentication
- [x] AI agricultural chat
- [x] Weather intelligence
- [x] Crop diagnosis
- [x] Soil analysis
- [x] Agricultural library
- [x] Multilingual foundation
- [x] Voice input
- [x] Market analytics foundation

---

## Phase 2 — Personalized Farming Intelligence

- [ ] Farmer-specific farm profiles
- [ ] Crop lifecycle tracking
- [ ] Personalized irrigation schedules
- [ ] Personalized fertilizer recommendations
- [ ] Crop health history
- [ ] Farm activity tracking
- [ ] Improved decision engine

---

## Phase 3 — Real-Time Agricultural Intelligence

- [ ] Real-time market data
- [ ] Location-aware agricultural recommendations
- [ ] Hyperlocal weather intelligence
- [ ] Pest and disease outbreak alerts
- [ ] Agricultural risk prediction
- [ ] Government scheme discovery

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

## Phase 5 — Farmer Ecosystem

The long-term goal is to evolve GroWell AI into a complete digital agricultural companion connecting:

```text
Farmer
   │
   ├── AI Advisor
   ├── Crop Health
   ├── Soil Intelligence
   ├── Weather
   ├── Market Intelligence
   ├── Government Schemes
   ├── Knowledge Library
   └── Farm Management
          │
          ▼
   Better Farming Decisions
          │
          ▼
   Improved Productivity
```

---

# 🎯 Why GroWell AI?

GroWell AI is not designed to simply answer agricultural questions.

Its goal is to transform fragmented agricultural information into **clear, practical and actionable decisions for farmers**.

Instead of asking farmers to interpret multiple sources of information independently, GroWell AI aims to bring those signals together:

**Crop + Soil + Weather + Market + AI**

into one agricultural intelligence platform.

---

# 🌱 Our Vision

> **A future where every farmer has access to an intelligent agricultural companion.**

GroWell AI aims to make agricultural intelligence more accessible, understandable, and actionable — regardless of language, technical background, or access to agricultural experts.

---

# 👥 Team

### Team NG Frontiers

**Sampad Kumar Santra**\
**Debarghya Maiti**\
**Ankita Kumari**

---

# 📜 License

This project is currently under development.

License information will be added as the project moves toward public release.

---

## 🌱 GroWell AI

**Cultivating Intelligence. Growing Possibilities.**
