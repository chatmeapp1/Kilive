const ROLES = {
  SUPERADMIN: 'superadmin',   // pilihan tambahan
  ADMIN: 'admin',
  MODERATOR: 'moderator',     // opsional
  AGENCY: 'agency',
  HOST: 'host',
  USER: 'user'
};

const PERMISSIONS = {
  // Superadmin (developer)
  [ROLES.SUPERADMIN]: [
    'everything'
  ],

  // Admin
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_agencies',
    'manage_hosts',
    'manage_gifts',
    'view_all_income',
    'suspend_users',
    'view_reports',
    'force_end_live',
    'refund_management',
    'global_announcement'
  ],

  // Moderator
  [ROLES.MODERATOR]: [
    'mute_user',
    'ban_user',
    'kick_from_live',
    'view_reports'
  ],

  // Agency
  [ROLES.AGENCY]: [
    'add_host',
    'remove_host',
    'edit_host_info',
    'view_host_list',
    'view_host_income',
    'view_agency_income',
    'view_commission',
    'approve_withdraw_host',
    'view_host_performance'
  ],

  // Host
  [ROLES.HOST]: [
    'start_live',
    'end_live',
    'update_stream_title',
    'view_own_income',
    'view_live_hours',
    'receive_gifts',
    'receive_jp_bonus',
    'withdraw_diamonds'
  ],

  // User / Viewer
  [ROLES.USER]: [
    'watch_live',
    'send_gift',
    'purchase_lucky_gift',
    'top_up',
    'follow_host',
    'send_message',
    'join_multi_guest',
    'request_cohost'
  ]
};

module.exports = { ROLES, PERMISSIONS };