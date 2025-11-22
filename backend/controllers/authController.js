const bcrypt = require('bcryptjs');
const { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken 
} = require('../utils/tokenUtils');
const { ROLES } = require('../config/roles');

// Temporary storage (replace later with database)
const users = new Map();
const refreshTokens = new Map();

const authController = {

  // =====================================
  // REGISTER USER
  // =====================================
  register: async (req, res) => {
    try {
      const { username, email, password, role = 'user' } = req.body;

      // Role check
      if (!Object.values(ROLES).includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role',
        });
      }

      // Check existing user
      const existing = Array.from(users.values()).find(u => u.email === email);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate ID with format: DDMMYY + random 3 digits
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const userId = day + month + year + random;
      
      const newUser = {
        id: userId,
        username,
        email,
        password: hashedPassword,
        role,
        isActive: true,
        diamonds: role === 'host' ? 0 : undefined,
        coins: role === 'user' ? 0 : undefined,
        createdAt: new Date(),
      };

      users.set(userId, newUser);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          userId,
          username,
          email,
          role,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // =====================================
  // LOGIN
  // =====================================
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = Array.from(users.values()).find(u => u.email === email);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Check password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account suspended',
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokens.set(user.id, refreshToken);

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken,
          user: {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            coins: user.coins,
            diamonds: user.diamonds,
          },
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // =====================================
  // REFRESH TOKEN
  // =====================================
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token required',
        });
      }

      const decoded = verifyRefreshToken(refreshToken);

      const stored = refreshTokens.get(decoded.userId);
      if (!stored || stored !== refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token',
        });
      }

      const user = users.get(decoded.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User not found or inactive',
        });
      }

      const newAccessToken = generateAccessToken(user);

      return res.json({
        success: true,
        data: {
          accessToken: newAccessToken,
        },
      });

    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }
  },

  // =====================================
  // LOGOUT
  // =====================================
  logout: (req, res) => {
    try {
      const userId = req.user?.userId;

      if (userId) refreshTokens.delete(userId);

      return res.json({
        success: true,
        message: 'Logout successful',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // =====================================
  // GET USER PROFILE
  // =====================================
  getMe: (req, res) => {
    try {
      const user = users.get(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const { password, ...safeUser } = user;

      return res.json({
        success: true,
        data: safeUser,
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};

module.exports = authController;