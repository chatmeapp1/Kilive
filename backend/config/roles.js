/** SYSTEM ROLES (RBAC) **/
const ROLES = {
  SUPER_ADMIN: 'super_admin',   // Optional: For full platform control
  ADMIN: 'admin',
  AGENCY: 'agency',
  HOST: 'host',
  USER: 'user'                  // viewer
};

/** PERMISSIONS BASED ON ROLE **/
const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'system_control',
    'manage_admins',
    'manage_users',
    'manage_agencies',
    'manage_hosts',
    'manage_gifts',
    'view_all_income',
    'view_reports',
    'platform_settings'
  ],

  [ROLES.ADMIN]: [
    'manage_users',
    'manage_agencies',
    'manage_hosts',
    'manage_gifts',
    'view_all_income',
    'suspend_users',
    'view_reports'
  ],

  [ROLES.AGENCY]: [
    'add_host',
    'view_host_list',
    'view_host_income',
    'view_agency_income',
    'view_commission',
    'view_host_performance'
  ],

  [ROLES.HOST]: [
    'start_live',
    'end_live',
    'view_own_income',
    'view_live_hours',
    'receive_gifts',
    'withdraw_diamonds'
  ],

  [ROLES.USER]: [
    'watch_live',
    'send_gift',
    'top_up',
    'follow_host',
    'send_message'
  ]
};

/** LIST ALL VALID ROLES */
const VALID_ROLES = Object.values(ROLES);

/**
 * Check if a user has specific permission.
 * Example: hasPermission(user.role, 'manage_users')
 */
const hasPermission = (role, permission) => {
  const rolePerm = PERMISSIONS[role];
  if (!rolePerm) return false;
  return rolePerm.includes(permission);
};

module.exports = {
  ROLES,
  VALID_ROLES,
  PERMISSIONS,
  hasPermission
};