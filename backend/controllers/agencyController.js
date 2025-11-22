const { ROLES } = require('../config/roles');

// Temporary data (replace later with DB)
const agencies = new Map();      // agencyId → agency data
const hosts = new Map();         // hostId → host data

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

      // Generate ID with format: DDMMYY + random 3 digits
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const agencyId = 'AG' + day + month + year + random;

      const newAgency = {
        agencyId,
        agencyName,
        description: description || '',
        ownerId: req.user.userId,
        hosts: [], // list hostId
        createdAt: new Date(),
      };

      agencies.set(agencyId, newAgency);

      return res.status(201).json({
        success: true,
        message: 'Agency created successfully',
        data: newAgency
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // GET HOSTS IN AGENCY
  // =====================================================
  getHosts: async (req, res) => {
    try {
      const agencyId = req.user.role === ROLES.AGENCY
        ? req.user.agencyId
        : req.params.agencyId;

      if (!agencyId || !agencies.has(agencyId)) {
        return res.status(404).json({
          success: false,
          message: 'Agency not found'
        });
      }

      const agency = agencies.get(agencyId);

      const hostList = agency.hosts.map(hostId => hosts.get(hostId) || null);

      return res.json({
        success: true,
        data: {
          hosts: hostList.filter(Boolean),
          total: hostList.length
        }
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
      const agencyId = req.user.role === ROLES.AGENCY
        ? req.user.agencyId
        : req.params.agencyId;

      if (!agencyId || !agencies.has(agencyId)) {
        return res.status(404).json({
          success: false,
          message: 'Agency not found'
        });
      }

      const commissionRate = 20; // 20%

      let totalHostIncome = 0;

      const agency = agencies.get(agencyId);

      agency.hosts.forEach(hostId => {
        const host = hosts.get(hostId);
        if (host && host.income) {
          totalHostIncome += host.income;
        }
      });

      const commissionEarned = Math.floor((totalHostIncome * commissionRate) / 100);

      return res.json({
        success: true,
        data: {
          totalHostIncome,
          commissionRate,
          commissionEarned,
          thisMonth: commissionEarned,
          lastMonth: 0 // placeholder
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
          message: 'Only agency can add hosts'
        });
      }

      const { hostId } = req.body;
      const agencyId = req.user.agencyId;

      if (!hostId) {
        return res.status(400).json({
          success: false,
          message: 'Host ID required'
        });
      }

      if (!hosts.has(hostId)) {
        hosts.set(hostId, {
          hostId,
          income: 0,
          agencyId: null,
          createdAt: new Date()
        });
      }

      const host = hosts.get(hostId);
      host.agencyId = agencyId;

      const agency = agencies.get(agencyId);
      if (!agency.hosts.includes(hostId)) {
        agency.hosts.push(hostId);
      }

      return res.json({
        success: true,
        message: 'Host added to agency',
        data: host
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // GET HOST PERFORMANCE
  // =====================================================
  getHostPerformance: async (req, res) => {
    try {
      const { hostId } = req.params;

      if (!hosts.has(hostId)) {
        return res.status(404).json({
          success: false,
          message: 'Host not found'
        });
      }

      const host = hosts.get(hostId);

      if (req.user.role === ROLES.AGENCY && host.agencyId !== req.user.agencyId) {
        return res.status(403).json({
          success: false,
          message: 'This host does not belong to your agency'
        });
      }

      return res.json({
        success: true,
        data: {
          hostId,
          totalLiveHours: host.totalLiveHours || 0,
          totalIncome: host.income || 0,
          averageViewers: host.averageViewers || 0,
          totalGifts: host.totalGifts || 0,
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