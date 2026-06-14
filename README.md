# TruthCheck - Media Authenticity & Deepfake Detection Platform

TruthCheck is a full-stack application designed to combat misinformation by analyzing media files and news articles for authenticity. It leverages AI deepfake detection (Mock/Deepware) and Fact-Checking APIs (Mock/Google).

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **AI/Forensics**: Deepware Scanner API (Integrated), Google Fact Check Tools (Integrated)

## Prerequisites
- Node.js (v14+)
- MongoDB (Running locally on default port 27017)

## Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file with your API keys (optional, mocks are enabled by default)
npm start
```
Server runs on `http://localhost:5000`

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

## Features
- **Media Analysis**: Upload Video/Image -> Detect Deepfakes.
- **Text Verification**: Paste URL/Text -> Check against Fact-Check databases.
- **Trust Score**: Weighted algorithmic score based on AI probability, metadata, and manual verification.
- **Reporting**: Detailed analysis reports with visual indicators.

## Architecture
- **MVC Pattern**: Backend organized into Models, Views (Routes/Controllers), and Services.
- **Service Layer**: External API calls are encapsulated in `services/` with fallback mock logic for robust demonstration.
