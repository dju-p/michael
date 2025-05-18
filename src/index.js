const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRoutes } = require('./routes/userRoutes');
const { semesterRoutes } = require('./routes/semesterRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/semesters', semesterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'University API - MongoDB with Prisma' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});