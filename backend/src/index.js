// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import boardRoutes from './routes/boards.js';
import cardRoutes from './routes/cards.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRoutes);
app.use('/api/boards/:boardId/cards', cardRoutes);
app.use('/api/cards', cardRoutes);

// Root route (optional, for testing)
app.get('/', (req, res) => {
  res.send('Kudos Board API is running');
});

// Global error handler (optional enhancement)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
