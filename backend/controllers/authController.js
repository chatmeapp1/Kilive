const bcrypt = require('bcryptjs');
const { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken 
} = require('../utils/tokenUtils');
const { ROLES } = require('../config/roles');

// TEMPORARY STORAGE (replace with PostgreSQL later)
const users = new Map();
const refreshTokens = new Map();

/**
 * Generate unique User ID (DDMMYY + random 4 digits)
 */
function generateUserId() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  const rand = Math.floor(Math.random() * 9000 + 1000); // 4 digits

  return `${day}${month}${year}${rand}`;
}

const authController = {

  /**
   * REGISTER
   */
  register: async (req, res) => {
    try {
      const { username, email, password, role = ROLES.USER } = req.body;

      // Validate role
      if (!Object.values(ROLES).includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role'
        });
      }

      // Check existing email
      const existing = Array.from(users.values()).find(u => u.email === email);

      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = generateUserId();

      const newUser = {
        id: userId,
        username,
        email,
        password: hashedPassword,
        role,
        agencyId: role === ROLES.AGENCY ? userId : null,
        isActive: true,
        coins: role === ROLES.USER ? 0 : null,
        diamonds: role === ROLES.HOST ? 0 : null,
        createdAt: new Date()
      };

      users.set(userId, newUser);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          userId,
          username,
          email,
          role
        }
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  /**
   * LOGIN
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = Array.from(users.values()).find(u => u.email === email);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Compare password
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check suspend
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is suspended'
        });
      }

      // Issue tokens
      const accessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      refreshTokens.set(user.id, newRefreshToken);

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken: newRefreshToken,
          user: {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            coins: user.coins,
            diamonds: user.diamonds
          }
        }
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  /**
   * REFRESH TOKEN
   */
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token required'
        });
      }

      // Validate refresh token
      const decoded = verifyRefreshToken(refreshToken);

      const storedToken = refreshTokens.get(decoded.userId);

      if (!storedToken || storedToken !== refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }

      const user = users.get(decoded.userId);

      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User inactive'
        });
      }

      const newAccessToken = generateAccessToken(user);

      return res.json({
        success: true,
        data: {
          accessToken: newAccessToken
        }
      });

    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }
  },

  /**
   * LOGOUT
   */
  logout: (req, res) => {
    try {
      if (req.user?.userId) {
        refreshTokens.delete(req.user.userId);
      }

      return res.json({
        success: true,
        message: 'Logout successful'
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  /**
   * GET ME (Profile)
   */
  getMe: (req, res) => {
    try {
      const user = users.get(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const { password, ...profile } = user;

      return res.json({
        success: true,
        data: profile
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

};

module.exports = authController;