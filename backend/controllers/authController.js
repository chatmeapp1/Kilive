
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const { ROLES } = require('../config/roles');

// Temporary in-memory storage (replace with database)
const users = new Map();
const refreshTokens = new Map();

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password, role = 'user' } = req.body;
      
      // Validate role
      const validRoles = Object.values(ROLES);
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role'
        });
      }
      
      // Check if user exists
      const existingUser = Array.from(users.values()).find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }
      
      // TODO: Hash password with bcrypt
      const userId = Date.now().toString();
      const newUser = {
        id: userId,
        username,
        email,
        password, // TODO: Hash this
        role,
        diamonds: role === 'host' ? 0 : undefined,
        coins: role === 'user' ? 0 : undefined,
        isActive: true,
        createdAt: new Date()
      };
      
      users.set(userId, newUser);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          userId,
          username,
          email,
          role
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = Array.from(users.values()).find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // TODO: Verify password with bcrypt
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is suspended'
        });
      }
      
      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      
      // Store refresh token
      refreshTokens.set(user.id, refreshToken);
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken,
          user: {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            diamonds: user.diamonds,
            coins: user.coins
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token required'
        });
      }
      
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      
      // Check if refresh token exists in storage
      const storedToken = refreshTokens.get(decoded.userId);
      if (!storedToken || storedToken !== refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }
      
      // Get user
      const user = users.get(decoded.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User not found or inactive'
        });
      }
      
      // Generate new access token
      const newAccessToken = generateAccessToken(user);
      
      res.json({
        success: true,
        data: {
          accessToken: newAccessToken
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }
  },

  logout: async (req, res) => {
    try {
      const userId = req.user?.userId;
      
      if (userId) {
        // Remove refresh token
        refreshTokens.delete(userId);
      }
      
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  verifyToken: async (req, res) => {
    try {
      // User info already attached by authenticate middleware
      res.json({
        success: true,
        data: req.user
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  },

  // Get current user profile
  getMe: async (req, res) => {
    try {
      const user = users.get(req.user.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      const { password, ...userWithoutPassword } = user;
      
      res.json({
        success: true,
        data: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = authController;
