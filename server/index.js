require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();
const defaultClientUrls = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://truthcheck-brown.vercel.app'
];
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || defaultClientUrls.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

if (process.env.NODE_ENV === 'production') {
    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI is not set. The API will run, but reports and users will not persist.');
    }

    if (!process.env.JWT_SECRET) {
        console.warn('JWT_SECRET is not set. Set a strong secret before using authentication in production.');
    }
}

// Connect Database
connectDB();

// Middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/analyze', analyzeRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send("TruthCheck API is running...");
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
