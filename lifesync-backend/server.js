const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://life-sync-two.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// --- IMPORTANT: apply CORS once ONLY ---
app.use(cors(corsOptions));

// Handle preflight
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
    res.send('LifeSync Backend is running!');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
