class User {
  constructor(row) {
    // Direct mapping from DB (snake_case → camelCase)
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;

    // Hashed password (NEVER exposed)
    this.password = row.password;

    this.role = row.role;                     // admin | agency | host | user
    this.agencyId = row.agency_id || null;    // For hosts under agency

    this.diamonds = row.diamonds || 0;        // Host income (converted gift)
    this.coins = row.coins || 0;              // Viewer balance

    this.liveHoursToday = row.live_hours_today
      ? Number(row.live_hours_today)
      : 0;

    this.totalIncome = row.total_income || 0; // Used by host & agency

    this.refreshToken = row.refresh_token || null;
    this.isActive = row.is_active !== undefined ? row.is_active : true;

    // Profile
    this.avatarUrl = row.avatar_url || null;
    this.bio = row.bio || null;

    // Timestamps
    this.createdAt = row.created_at ? new Date(row.created_at) : new Date();
    this.updatedAt = row.updated_at ? new Date(row.updated_at) : new Date();
  }
}

module.exports = User;