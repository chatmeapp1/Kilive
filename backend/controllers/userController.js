const db = require('../config/database');

const userController = {

  // ==========================================================
  // GET USER PROFILE
  // ==========================================================
  getProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      const result = await db.query(
        `SELECT id, username, email, avatar_url, bio, role, diamonds, coins, created_at 
         FROM users 
         WHERE id = $1`,
        [userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.json({
        success: true,
        data: result.rows[0]
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE PROFILE
  // ==========================================================
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { username, bio, avatar } = req.body;

      await db.query(
        `UPDATE users 
         SET username = COALESCE($1, username),
             bio = COALESCE($2, bio),
             avatar_url = COALESCE($3, avatar_url),
             updated_at = NOW()
         WHERE id = $4`,
        [username, bio, avatar, userId]
      );

      return res.json({
        success: true,
        message: "Profile updated successfully"
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // GET USER LEVEL (Example EXP)
  // ==========================================================
  getUserLevel: async (req, res) => {
    try {
      const { userId } = req.params;

      // Example EXP logic — kamu dapat modifikasi sesuai kebutuhan
      const result = await db.query(
        `SELECT total_income FROM users WHERE id=$1`,
        [userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const income = Number(result.rows[0].total_income) || 0;
      const level = Math.floor(income / 1000) + 1;
      const currentExp = income % 1000;
      const nextLevelExp = 1000;

      return res.json({
        success: true,
        data: {
          level,
          currentExp,
          nextLevelExp
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // GET HOST INCOME (DIAMONDS)
  // ==========================================================
  getUserIncome: async (req, res) => {
    try {
      const hostId = req.params.userId;

      if (req.user.role !== "host" && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Only hosts can view income"
        });
      }

      const result = await db.query(
        `SELECT 
            COALESCE(SUM(total_price), 0) AS totalDiamonds
         FROM gift_transactions
         WHERE receiver_id = $1`,
        [hostId]
      );

      const totalDiamonds = Number(result.rows[0].totaldiamonds);

      // Income breakdown (optional)
      const today = await db.query(
        `SELECT COALESCE(SUM(total_price), 0) AS today
         FROM gift_transactions
         WHERE receiver_id=$1 
         AND created_at::date = NOW()::date`,
        [hostId]
      );

      const week = await db.query(
        `SELECT COALESCE(SUM(total_price), 0) AS week
         FROM gift_transactions
         WHERE receiver_id=$1 
         AND created_at >= NOW() - INTERVAL '7 days'`,
        [hostId]
      );

      const month = await db.query(
        `SELECT COALESCE(SUM(total_price), 0) AS month
         FROM gift_transactions
         WHERE receiver_id=$1 
         AND created_at >= NOW() - INTERVAL '30 days'`,
        [hostId]
      );

      return res.json({
        success: true,
        data: {
          totalDiamonds,
          todayDiamonds: Number(today.rows[0].today),
          weekDiamonds: Number(week.rows[0].week),
          monthDiamonds: Number(month.rows[0].month),
          availableForWithdraw: totalDiamonds
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // GET USER COINS (FOR VIEWERS)
  // ==========================================================
  getUserCoins: async (req, res) => {
    try {
      const userId = req.user.userId;

      const result = await db.query(
        `SELECT coins FROM users WHERE id=$1`,
        [userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Recharge history (optional)
      const rechargeHistory = [];

      return res.json({
        success: true,
        data: {
          coins: Number(result.rows[0].coins),
          rechargeHistory
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // GET USER FANS
  // ==========================================================
  getUserFans: async (req, res) => {
    try {
      const { userId } = req.params;

      const fans = await db.query(
        `SELECT follower_id as fanId, created_at 
         FROM fans 
         WHERE user_id = $1`,
        [userId]
      );

      return res.json({
        success: true,
        data: {
          totalFans: fans.rowCount,
          fans: fans.rows
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};

module.exports = userController;