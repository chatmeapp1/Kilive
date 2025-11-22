const { verifyAccessToken } = require('../utils/tokenUtils');
const { ROLES, PERMISSIONS } = require('../config/roles');

// Middleware: Verifikasi JWT
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    req.user = decoded; // { userId, role, agencyId?, hostId? ... }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};



// Middleware: hanya role tertentu yang boleh masuk
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



// Middleware: permission-based (tambahan)
const allowPermission = (permission) => {
  return (req, res, next) => {
    const role = req.user?.role;

    // Superadmin bypass semua
    if (role === ROLES.SUPERADMIN) return next();

    if (!PERMISSIONS[role]?.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Missing permission "${permission}"`
      });
    }

    next();
  };
};



// Middleware: cek kepemilikan user/host/agency
const checkOwnership = (req, res, next) => {
  const requestedUserId = req.params.userId || req.body.userId;
  const currentUser = req.user;

  // Admin boleh akses semua
  if (currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.SUPERADMIN) {
    return next();
  }

  // Agency boleh akses host di bawah agensinya
  if (currentUser.role === ROLES.AGENCY) {
    // nanti tambahkan pengecekan DB: host belongs-to agency
    return next();
  }

  // Host boleh akses data live miliknya saja
  if (currentUser.role === ROLES.HOST) {
    if (currentUser.userId !== requestedUserId) {
      return res.status(403).json({
        success: false,
        message: 'Host cannot access another host data'
      });
    }
    return next();
  }

  // User biasa hanya bisa akses data dirinya
  if (currentUser.role === ROLES.USER) {
    if (currentUser.userId !== requestedUserId) {
      return res.status(403).json({
        success: false,
        message: 'Cannot access other user data'
      });
    }
    return next();
  }

  next();
};



// Export
module.exports = {
  authenticate,
  authorize,
  allowPermission,
  isAdmin: authorize('admin', 'superadmin'),
  isAgency: authorize('agency', 'admin', 'superadmin'),
  isHost: authorize('host', 'admin', 'superadmin'),
  isUser: authorize('user', 'host', 'agency', 'admin', 'superadmin'),
  checkOwnership
};