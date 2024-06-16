require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/userRoute');
const driverRoutes = require('./routes/driverRoute');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.DATABASE_URI;

// CORS options
const corsOptions = {
    origin: ["http://localhost:3000", 'https://bus-tracking-system.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth/user', authRoutes);
app.use('/auth', driverRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        console.log("Connected to MongoDB successfully");
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));