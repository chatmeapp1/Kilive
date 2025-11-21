
class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role; // 'admin', 'agency', 'host', 'user'
    this.agencyId = data.agencyId || null; // For hosts under agency
    this.diamonds = data.diamonds || 0; // For hosts
    this.coins = data.coins || 0; // For users
    this.liveHoursToday = data.liveHoursToday || 0; // For hosts
    this.totalIncome = data.totalIncome || 0; // For hosts and agencies
    this.refreshToken = data.refreshToken || null;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

module.exports = User;
