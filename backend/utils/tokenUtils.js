const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/roles');

/* ENV secrets */
const ACCESS_TOKEN_SECRET =
  process.env.JWT_SECRET || 'change-this-access-token-secret';

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'change-this-refresh-token-secret';

/* Token expiry */
const ACCESS_TOKEN_EXPIRY = '15m';  // Recommended for mobile apps
const REFRESH_TOKEN_EXPIRY = '30d'; // Safe for long-term login on mobile

/**
 * Create secure access token
 */
const generateAccessToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    agencyId: user.agencyId || null,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  });
};

/**
 * Create refresh token (for re-generating new access token)
 * DO NOT put sensitive data here.
 */
const generateRefreshToken = (user) => {
  const payload = {
    userId: user.id,
    role: user.role
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY
  });
};

/**
 * Verify ACCESS token
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Access token expired');
    }
    throw new Error('Invalid access token');
  }
};

/**
 * Verify REFRESH token
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    }
    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};