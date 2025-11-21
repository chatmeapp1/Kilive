
const { verifyAccessToken } = require('../utils/tokenUtils');

// Middleware untuk verifikasi token
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    
    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};

// Middleware untuk check role
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
        message: 'Forbidden: Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware khusus untuk admin
const isAdmin = authorize('admin');

// Middleware khusus untuk agency
const isAgency = authorize('agency', 'admin');

// Middleware khusus untuk host
const isHost = authorize('host', 'admin');

// Middleware khusus untuk user/viewer
const isUser = authorize('user', 'host', 'agency', 'admin');

// Middleware untuk check ownership (host hanya bisa akses data sendiri)
const checkOwnership = (req, res, next) => {
  const requestedUserId = req.params.userId || req.body.userId;
  
  // Admin bisa akses semua
  if (req.user.role === 'admin') {
    return next();
  }
  
  // Agency bisa akses host di bawahnya
  if (req.user.role === 'agency') {
    // TODO: Check if host belongs to this agency
    return next();
  }
  
  // User hanya bisa akses data sendiri
  if (req.user.userId !== requestedUserId) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Cannot access other user data'
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
