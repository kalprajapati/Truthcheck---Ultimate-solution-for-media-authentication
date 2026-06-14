# TruthCheck - Media Authenticity & Deepfake Detection Platform

TruthCheck is a full-stack application designed to combat misinformation by analyzing media files and news articles for authenticity. It leverages AI deepfake detection (Mock/Deepware) and Fact-Checking APIs (Mock/Google).

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **AI/Forensics**: Deepware Scanner API (Integrated), Google Fact Check Tools (Integrated)

## Prerequisites
- Node.js 20.19+
- MongoDB locally, or a MongoDB Atlas connection string

## Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
# Copy .env.example to .env and update values as needed
npm start
```
Server runs on `http://localhost:5000`

Required backend environment variables:
```env
PORT=5000
CLIENT_URLS=http://localhost:5173,http://localhost:4173
MONGO_URI=mongodb://localhost:27017/truthcheck
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=
GOOGLE_FACT_CHECK_KEY=
DEEPWARE_API_KEY=
EMAIL_USER=
EMAIL_PASS=
```

### 2. Frontend Setup
```bash
cd client
npm install
# Copy .env.example to .env and set VITE_API_URL=http://localhost:5000
npm run dev
```
Client runs on `http://localhost:5173`

Required frontend environment variable:
```env
VITE_API_URL=http://localhost:5000
```

## Deployment

### Render API
- Use the included `render.yaml`, or create a Render Web Service with:
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `CLIENT_URLS`: your deployed Vercel URL, for example `https://truthcheck-brown.vercel.app`
  - `MONGO_URI`: MongoDB Atlas connection string
  - `JWT_SECRET`: long random secret
  - Optional API keys: `GEMINI_API_KEY`, `GOOGLE_FACT_CHECK_KEY`, `DEEPWARE_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`

### Vercel Client
- Project root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_URL`: your Render service URL, for example `https://truthcheck-api.onrender.com`

The client includes `client/vercel.json` so direct refreshes on routes such as `/dashboard` and `/results` serve the React app instead of a Vercel 404.

## Deployment Issues Fixed
- API environment variable mismatch: Vite only exposes variables prefixed with `VITE_`, so auth requests using `import.meta.env.API_URL` built URLs like `undefined/api/auth/login`.
- API base-path mismatch: analysis calls were made to `/media` and `/text` unless `VITE_API_URL` already contained `/api/analyze`. The client now uses one server origin and explicit `/api/...` paths.
- Hard-coded CORS: the server allowed only one Vercel URL, breaking localhost, preview deployments, and renamed Vercel projects. CORS now reads comma-separated origins from `CLIENT_URLS`.
- React Router production refreshes: Vercel needs an SPA rewrite to `index.html` for `BrowserRouter` routes.
- Render upload path: Multer used a relative `uploads/` path. It now resolves to the server upload directory independent of process working directory.
- Runtime version: Vite 7 requires modern Node, so both packages now declare `node >=20.19.0`.

## Features
- **Media Analysis**: Upload Video/Image -> Detect Deepfakes.
- **Text Verification**: Paste URL/Text -> Check against Fact-Check databases.
- **Trust Score**: Weighted algorithmic score based on AI probability, metadata, and manual verification.
- **Reporting**: Detailed analysis reports with visual indicators.

## Architecture
- **MVC Pattern**: Backend organized into Models, Views (Routes/Controllers), and Services.
- **Service Layer**: External API calls are encapsulated in `services/` with fallback mock logic for robust demonstration.
