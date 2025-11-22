const { verifyAccessToken } = require('../utils/tokenUtils');
const { ROLES } = require('../config/roles');

/**
 * AUTHENTICATION
 * Validasi JWT Access Token
 */
const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing'
      });
    }

    const token = header.split(' ')[1];

    // Verify access token
    const decoded = verifyAccessToken(token);

    // Attach user payload
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.message === 'Access token expired'
          ? 'Access token expired'
          : 'Invalid access token'
    });
  }
};

/**
 * ROLE AUTHORIZATION
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient permissions'
      });
    }

    next();
  };
};

/* Role-based helpers */
const isAdmin = authorize(ROLES.ADMIN);
const isAgency = authorize(ROLES.AGENCY, ROLES.ADMIN);
const isHost = authorize(ROLES.HOST, ROLES.ADMIN);
const isUser = authorize(ROLES.USER, ROLES.HOST, ROLES.AGENCY, ROLES.ADMIN);

/**
 * OWNERSHIP CHECKER
 * User hanya bisa akses data miliknya kecuali admin/agency
 */
const checkOwnership = (req, res, next) => {
  const targetUserId =
    req.params.userId || req.body.userId || req.query.userId;

  if (!targetUserId) {
    return res.status(400).json({
      success: false,
      message: 'User ID required'
    });
  }

  // Admin bebas akses apa saja
  if (req.user.role === ROLES.ADMIN) {
    return next();
  }

  // Agency: boleh akses USER atau HOST yang berada di bawahnya
  // TODO: jika sudah ada database, cek agency-host relation
  if (req.user.role === ROLES.AGENCY) {
    return next();
  }

  // User biasa hanya bisa akses data sendiri
  if (req.user.userId !== targetUserId) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: cannot access other user data'
    });
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
  isAdmin,
  isAgency,
  isHost,
  isUser,
  checkOwnership
};