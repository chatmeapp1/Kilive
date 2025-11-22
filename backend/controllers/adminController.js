const db = require('../db'); // koneksi Neon/PostgreSQL

const adminController = {

  // ============================
  // GET ALL USERS
  // ============================
  getAllUsers: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const usersQuery = `
        SELECT id, username, email, role, agency_id, diamonds, coins, is_active, created_at 
        FROM users
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `;
      const countQuery = `SELECT COUNT(*) AS total FROM users`;

      const usersResult = await db.query(usersQuery, [limit, offset]);
      const countResult = await db.query(countQuery);

      res.json({
        success: true,
        page,
        totalPages: Math.ceil(countResult.rows[0].total / limit),
        total: Number(countResult.rows[0].total),
        users: usersResult.rows
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // ============================
  // SUSPEND OR ACTIVATE USER
  // ============================
  toggleUserStatus: async (req, res) => {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const query = `
        UPDATE users 
        SET is_active = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING id, username, email, role, is_active
      `;

      const result = await db.query(query, [isActive, userId]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: `User ${isActive ? 'activated' : 'suspended'} successfully`,
        data: result.rows[0]
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ============================
  // ADD GIFT
  // ============================
  addGift: async (req, res) => {
    try {
      const { name, price, category, image } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Fields name, price, and category are required'
        });
      }

      const query = `
        INSERT INTO gifts (name, price, category, image_url, is_luxury)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

      const isLuxury = category === 'luxury';

      const result = await db.query(query, [name, price, category, image, isLuxury]);

      res.status(201).json({
        success: true,
        message: 'Gift added successfully',
        data: result.rows[0]
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ============================
  // GET ALL INCOME
  // ============================
  getAllIncome: async (req, res) => {
    try {
      const query = `
        SELECT 
          SUM(total_price) AS total_income,
          SUM(host_amount) AS host_income,
          SUM(agency_amount) AS agency_income,
          SUM(platform_amount) AS platform_income
        FROM income_logs
      `;

      const result = await db.query(query);
      const data = result.rows[0];

      res.json({
        success: true,
        data: {
          totalIncome: Number(data.total_income || 0),
          hostIncome: Number(data.host_income || 0),
          agencyIncome: Number(data.agency_income || 0),
          platformIncome: Number(data.platform_income || 0)
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ============================
  // DASHBOARD ANALYTICS
  // ============================
  getAnalytics: async (req, res) => {
    try {
      const userCount = await db.query(`SELECT COUNT(*) AS total FROM users`);
      const hostCount = await db.query(`SELECT COUNT(*) AS total FROM users WHERE role='host'`);
      const agencyCount = await db.query(`SELECT COUNT(*) AS total FROM users WHERE role='agency'`);
      
      const revenueQuery = `
        SELECT COALESCE(SUM(platform_amount),0) AS revenue 
        FROM income_logs
      `;
      const revenueRes = await db.query(revenueQuery);

      res.json({
        success: true,
        data: {
          totalUsers: Number(userCount.rows[0].total),
          totalHosts: Number(hostCount.rows[0].total),
          totalAgencies: Number(agencyCount.rows[0].total),
          activeLives: 0, // tambahkan nanti
          totalRevenue: Number(revenueRes.rows[0].revenue)
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

};

module.exports = adminController;