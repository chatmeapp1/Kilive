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
      const { username, bio, avatar_url, sex, age } = req.body;

      await db.query(
        `UPDATE users 
         SET username = COALESCE($1, username),
             bio = COALESCE($2, bio),
             avatar_url = COALESCE($3, avatar_url),
             sex = COALESCE($4, sex),
             age = COALESCE($5, age),
             updated_at = NOW()
         WHERE id = $6`,
        [username, bio, avatar_url, sex, age, userId]
      );

      const result = await db.query(
        `SELECT id, username, email, avatar_url, bio, sex, age, role, diamonds, coins 
         FROM users WHERE id = $1`,
        [userId]
      );

      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: result.rows[0]
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE AVATAR
  // ==========================================================
  updateAvatar: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { avatar_url } = req.body;

      if (!avatar_url) {
        return res.status(400).json({
          success: false,
          message: "Avatar URL is required"
        });
      }

      await db.query(
        `UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2`,
        [avatar_url, userId]
      );

      return res.json({
        success: true,
        message: "Avatar updated successfully",
        data: { avatar_url }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE NICKNAME
  // ==========================================================
  updateNickname: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { username } = req.body;

      if (!username || username.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Nickname is required"
        });
      }

      await db.query(
        `UPDATE users SET username = $1, updated_at = NOW() WHERE id = $2`,
        [username.trim(), userId]
      );

      return res.json({
        success: true,
        message: "Nickname updated successfully",
        data: { username: username.trim() }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE SEX
  // ==========================================================
  updateSex: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { sex } = req.body;

      if (!sex || !['Male', 'Female'].includes(sex)) {
        return res.status(400).json({
          success: false,
          message: "Sex must be 'Male' or 'Female'"
        });
      }

      await db.query(
        `UPDATE users SET sex = $1, updated_at = NOW() WHERE id = $2`,
        [sex, userId]
      );

      return res.json({
        success: true,
        message: "Sex updated successfully",
        data: { sex }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE AGE
  // ==========================================================
  updateAge: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { age } = req.body;

      if (!age || age < 1 || age > 120) {
        return res.status(400).json({
          success: false,
          message: "Invalid age"
        });
      }

      await db.query(
        `UPDATE users SET age = $1, updated_at = NOW() WHERE id = $2`,
        [age, userId]
      );

      return res.json({
        success: true,
        message: "Age updated successfully",
        data: { age }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ==========================================================
  // UPDATE BIO
  // ==========================================================
  updateBio: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bio } = req.body;

      await db.query(
        `UPDATE users SET bio = $1, updated_at = NOW() WHERE id = $2`,
        [bio || '', userId]
      );

      return res.json({
        success: true,
        message: "Bio updated successfully",
        data: { bio: bio || '' }
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