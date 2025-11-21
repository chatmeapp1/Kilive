
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const liveRoutes = require('./routes/live');
const giftRoutes = require('./routes/gift');
const userRoutes = require('./routes/user');
const agencyRoutes = require('./routes/agency');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/gift', giftRoutes);
app.use('/api/user', userRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Live streaming events
  socket.on('join-live', (data) => {
    socket.join(data.roomId);
    io.to(data.roomId).emit('user-joined', {
      userId: socket.id,
      username: data.username
    });
  });

  socket.on('leave-live', (data) => {
    socket.leave(data.roomId);
    io.to(data.roomId).emit('user-left', {
      userId: socket.id
    });
  });

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('new-message', {
      userId: socket.id,
      username: data.username,
      message: data.message,
      timestamp: new Date()
    });
  });

  socket.on('send-gift', (data) => {
    io.to(data.roomId).emit('new-gift', {
      userId: socket.id,
      username: data.username,
      giftId: data.giftId,
      giftName: data.giftName,
      giftImage: data.giftImage,
      combo: data.combo || 1,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
