const agencyController = {
  // Create agency (Admin only or registration)
  createAgency: async (req, res) => {
    try {
      const { agencyName, description } = req.body;

      // TODO: Add database logic

      res.status(201).json({
        success: true,
        message: 'Agency created successfully',
        data: {
          agencyId: Date.now(),
          agencyName,
          ownerId: req.user.userId
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get hosts under agency
  getHosts: async (req, res) => {
    try {
      const agencyId = req.user.role === 'agency' ? req.user.agencyId : req.params.agencyId;

      // TODO: Fetch from database where host.agencyId = agencyId

      res.json({
        success: true,
        data: {
          hosts: [],
          total: 0
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get agency income and commission
  getAgencyIncome: async (req, res) => {
    try {
      const agencyId = req.user.role === 'agency' ? req.user.agencyId : req.params.agencyId;

      // TODO: Fetch from database
      // Commission typically 10-30% of host income

      res.json({
        success: true,
        data: {
          totalHostIncome: 0,
          commissionRate: 20, // 20%
          commissionEarned: 0,
          thisMonth: 0,
          lastMonth: 0
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Add host to agency
  addHost: async (req, res) => {
    try {
      const { hostId } = req.body;
      const agencyId = req.user.agencyId;

      // TODO: Update host with agencyId in database

      res.json({
        success: true,
        message: 'Host added to agency successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get host performance
  getHostPerformance: async (req, res) => {
    try {
      const { hostId } = req.params;
      const agencyId = req.user.agencyId;

      // TODO: Verify host belongs to agency and fetch performance data

      res.json({
        success: true,
        data: {
          hostId,
          totalLiveHours: 0,
          totalIncome: 0,
          averageViewers: 0,
          totalGifts: 0,
          thisWeek: {
            liveHours: 0,
            income: 0
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = agencyController;