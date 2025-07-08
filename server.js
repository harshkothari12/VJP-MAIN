require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const studentRoutes = require('./src/routes/studentRoutes');
const open = require('open');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

connectDB();

// Routes
app.use('/api/students', studentRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send(`
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <h1 style="color: #667eea;">વિરતી જૈન પાઠશાળા</h1>
      <h2>Student Management System</h2>
      <p>Welcome to our modern student management system!</p>
      <p>🚀 Server is running successfully</p>
    </div>
  `);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api/students`);
  
  // Open browser automatically
  open.default(`http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated');
  process.exit(0);
});