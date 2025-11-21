
const ROLES = {
  ADMIN: 'admin',
  AGENCY: 'agency',
  HOST: 'host',
  USER: 'user'
};

const PERMISSIONS = {
  // Admin permissions
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_agencies',
    'manage_hosts',
    'manage_gifts',
    'view_all_income',
    'suspend_users',
    'view_reports'
  ],
  
  // Agency permissions
  [ROLES.AGENCY]: [
    'add_host',
    'view_host_list',
    'view_host_income',
    'view_agency_income',
    'view_commission',
    'view_host_performance'
  ],
  
  // Host permissions
  [ROLES.HOST]: [
    'start_live',
    'end_live',
    'view_own_income',
    'view_live_hours',
    'receive_gifts',
    'withdraw_diamonds'
  ],
  
  // User/Viewer permissions
  [ROLES.USER]: [
    'watch_live',
    'send_gift',
    'top_up',
    'follow_host',
    'send_message'
  ]
};

module.exports = { ROLES, PERMISSIONS };
