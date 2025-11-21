const liveController = {
  // Start live (Host only)
  startLive: async (req, res) => {
    try {
      const { title, category } = req.body;
      const hostId = req.user.userId;

      // TODO: Add database logic
      const roomId = `room_${Date.now()}`;

      res.status(201).json({
        success: true,
        message: 'Live started successfully',
        data: {
          roomId,
          hostId,
          title,
          category,
          startTime: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // End live (Host only)
  endLive: async (req, res) => {
    try {
      const { roomId } = req.body;
      const hostId = req.user.userId;

      // TODO: Verify host owns this room
      // TODO: Calculate live duration and update host stats
      // TODO: Convert gifts to diamonds

      const duration = 3600; // Mock: 1 hour
      const diamondsEarned = 500; // Mock

      res.json({
        success: true,
        message: 'Live ended successfully',
        data: {
          roomId,
          endTime: new Date(),
          duration,
          diamondsEarned,
          viewers: 150
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get active lives (All users)
  getActiveLives: async (req, res) => {
    try {
      // TODO: Fetch from database

      res.json({
        success: true,
        data: {
          lives: [],
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

  // Get live details (All users)
  getLiveDetails: async (req, res) => {
    try {
      const { roomId } = req.params;

      // TODO: Fetch from database

      res.json({
        success: true,
        data: {
          roomId,
          hostId: 'host123',
          hostName: 'Host Name',
          title: 'Live Stream',
          viewers: 0,
          startTime: new Date(),
          category: 'entertainment'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Join live (Authenticated users)
  joinLive: async (req, res) => {
    try {
      const { roomId } = req.params;
      const userId = req.user.userId;

      // TODO: Add user to room viewers

      res.json({
        success: true,
        message: 'Joined live successfully',
        data: {
          roomId,
          userId
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get host live hours (Host only)
  getHostLiveHours: async (req, res) => {
    try {
      const hostId = req.user.userId;

      // TODO: Calculate from database
      // 3 jam = 1 hari live

      res.json({
        success: true,
        data: {
          todayHours: 2.5,
          todayDays: 0.83, // 2.5 / 3
          weekHours: 12,
          weekDays: 4,
          monthHours: 45,
          monthDays: 15,
          totalHours: 150,
          totalDays: 50
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

module.exports = liveController;