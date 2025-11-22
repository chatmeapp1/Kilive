const db = require('../db');
const { ROLES } = require('../config/roles');

const agencyController = {

  // =====================================================
  // CREATE AGENCY (ADMIN ONLY)
  // =====================================================
  createAgency: async (req, res) => {
    try {
      if (req.user.role !== ROLES.ADMIN) {
        return res.status(403).json({
          success: false,
          message: 'Only admin can create agencies'
        });
      }

      const { agencyName, description } = req.body;

      if (!agencyName) {
        return res.status(400).json({
          success: false,
          message: 'Agency name required'
        });
      }

      // Generate agency ID (DDMMYY + 3 random digits)
      const now = new Date();
      const id = `AG${
        String(now.getDate()).padStart(2, '0') +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getFullYear()).slice(-2) +
        Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      }`;

      const query = `
        INSERT INTO agencies (id, agency_name, description, owner_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      const result = await db.query(query, [
        id,
        agencyName,
        description || '',
        req.user.userId
      ]);

      return res.status(201).json({
        success: true,
        message: 'Agency created successfully',
        data: result.rows[0]
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // GET HOSTS UNDER AGENCY
  // =====================================================
  getHosts: async (req, res) => {
    try {
      const agencyId =
        req.user.role === ROLES.AGENCY
          ? req.user.agencyId
          : req.params.agencyId;

      const checkAgency = await db.query(
        `SELECT * FROM agencies WHERE id=$1`,
        [agencyId]
      );

      if (checkAgency.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Agency not found'
        });
      }

      // Ambil semua host yg agency_id = agencyId
      const hosts = await db.query(
        `SELECT id, username, email, diamonds, total_income, created_at 
         FROM users 
         WHERE role='host' AND agency_id=$1`,
        [agencyId]
      );

      res.json({
        success: true,
        total: hosts.rowCount,
        hosts: hosts.rows
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // GET AGENCY INCOME
  // =====================================================
  getAgencyIncome: async (req, res) => {
    try {
      const agencyId =
        req.user.role === ROLES.AGENCY
          ? req.user.agencyId
          : req.params.agencyId;

      // Ambil informasi agency
      const agencyRes = await db.query(
        `SELECT * FROM agencies WHERE id=$1`,
        [agencyId]
      );

      if (agencyRes.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Agency not found'
        });
      }

      const agency = agencyRes.rows[0];
      const commissionRate = agency.commission_rate || 20;

      // Hitung total income semua host di agency
      const incomeQuery = `
        SELECT 
          COALESCE(SUM(gt.total_price), 0) AS total_host_income
        FROM gift_transactions gt
        JOIN users u ON u.id = gt.receiver_id
        WHERE u.role='host' AND u.agency_id=$1
      `;

      const incomeRes = await db.query(incomeQuery, [agencyId]);
      const totalHostIncome = Number(incomeRes.rows[0].total_host_income || 0);

      const commissionEarned = Math.floor(totalHostIncome * commissionRate / 100);

      res.json({
        success: true,
        data: {
          agencyId,
          totalHostIncome,
          commissionRate,
          commissionEarned,
          thisMonth: commissionEarned,  // placeholder
          lastMonth: 0                  // placeholder
        }
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // ADD HOST TO AGENCY
  // =====================================================
  addHost: async (req, res) => {
    try {
      if (req.user.role !== ROLES.AGENCY) {
        return res.status(403).json({
          success: false,
          message: 'Only agencies can add hosts'
        });
      }

      const { hostId } = req.body;

      if (!hostId) {
        return res.status(400).json({
          success: false,
          message: 'Host ID required'
        });
      }

      // Pastikan host ada
      const hostCheck = await db.query(
        `SELECT id, role FROM users WHERE id=$1`,
        [hostId]
      );

      if (hostCheck.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Host not found'
        });
      }

      if (hostCheck.rows[0].role !== 'host') {
        return res.status(400).json({
          success: false,
          message: 'This user is not a host'
        });
      }

      // Assign host ke agency
      await db.query(
        `UPDATE users SET agency_id=$1 WHERE id=$2`,
        [req.user.agencyId, hostId]
      );

      return res.json({
        success: true,
        message: 'Host added to agency successfully',
        data: {
          hostId,
          agencyId: req.user.agencyId
        }
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // HOST PERFORMANCE
  // =====================================================
  getHostPerformance: async (req, res) => {
    try {
      const { hostId } = req.params;

      const hostRes = await db.query(
        `SELECT id, username, agency_id, total_income, live_hours_today 
         FROM users WHERE id=$1 AND role='host'`,
        [hostId]
      );

      if (hostRes.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Host not found'
        });
      }

      const host = hostRes.rows[0];

      if (req.user.role === ROLES.AGENCY && host.agency_id !== req.user.agencyId) {
        return res.status(403).json({
          success: false,
          message: 'This host does not belong to your agency'
        });
      }

      res.json({
        success: true,
        data: {
          hostId,
          totalLiveHours: Number(host.live_hours_today || 0),
          totalIncome: Number(host.total_income || 0),
          averageViewers: 0,  // untuk nanti
          totalGifts: 0,      // untuk nanti
          thisWeek: {
            liveHours: 0,
            income: 0
          }
        }
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

};

module.exports = agencyController;