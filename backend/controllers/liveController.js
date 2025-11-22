const { ROLES } = require('../config/roles');

// Temporary storage
const liveRooms = new Map(); // roomId → roomData

// from giftController memory storage:
const hostIncome = require('../memory/hostIncome'); 
// If you haven't created this file yet, saya buatkan versi memory di bawah.

const liveController = {

  // ===============================================================
  // START LIVE (HOST ONLY)
  // ===============================================================
  startLive: async (req, res) => {
    try {
      const { title, category } = req.body;
      const hostId = req.user.userId;

      // Jika host sedang live, tolak
      for (const room of liveRooms.values()) {
        if (room.hostId === hostId) {
          return res.status(400).json({
            success: false,
            message: 'You already have an active live session'
          });
        }
      }

      const roomId = `room_${Date.now()}`;

      const liveData = {
        roomId,
        hostId,
        title: title || 'Untitled Live',
        category: category || 'general',
        startTime: new Date(),
        viewers: new Set()
      };

      liveRooms.set(roomId, liveData);

      return res.status(201).json({
        success: true,
        message: 'Live started successfully',
        data: liveData
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ===============================================================
  // END LIVE (HOST ONLY)
  // ===============================================================
  endLive: async (req, res) => {
    try {
      const { roomId } = req.body;
      const hostId = req.user.userId;

      const liveData = liveRooms.get(roomId);
      if (!liveData) {
        return res.status(404).json({
          success: false,
          message: 'Live room not found'
        });
      }

      if (liveData.hostId !== hostId) {
        return res.status(403).json({
          success: false,
          message: 'You do not own this live room'
        });
      }

      const endTime = new Date();
      const start = new Date(liveData.startTime);
      const durationSec = Math.floor((endTime - start) / 1000);

      // Ambil total income host selama live
      const earnedCoins = hostIncome.get(hostId) || 0;
      const diamondsEarned = earnedCoins; // convert 1:1 sementara

      // Reset income setelah end live
      hostIncome.set(hostId, 0);

      const response = {
        roomId,
        hostId,
        title: liveData.title,
        viewers: liveData.viewers.size,
        duration: durationSec,
        diamondsEarned,
        startTime: liveData.startTime,
        endTime
      };

      // Hapus room dari active live
      liveRooms.delete(roomId);

      return res.json({
        success: true,
        message: 'Live ended successfully',
        data: response
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ===============================================================
  // GET ACTIVE LIVES (PUBLIC)
  // ===============================================================
  getActiveLives: async (req, res) => {
    try {
      const list = Array.from(liveRooms.values()).map(room => ({
        roomId: room.roomId,
        hostId: room.hostId,
        title: room.title,
        category: room.category,
        viewers: room.viewers.size,
        startTime: room.startTime
      }));

      return res.json({
        success: true,
        data: {
          lives: list,
          total: list.length
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ===============================================================
  // GET LIVE DETAILS (PUBLIC)
  // ===============================================================
  getLiveDetails: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = liveRooms.get(roomId);

      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Live not found'
        });
      }

      return res.json({
        success: true,
        data: {
          roomId,
          hostId: room.hostId,
          title: room.title,
          category: room.category,
          viewers: room.viewers.size,
          startTime: room.startTime
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ===============================================================
  // JOIN LIVE (AUTH REQUIRED)
  // ===============================================================
  joinLive: async (req, res) => {
    try {
      const { roomId } = req.params;
      const userId = req.user.userId;

      const room = liveRooms.get(roomId);
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Live not found'
        });
      }

      room.viewers.add(userId);

      return res.json({
        success: true,
        message: 'Joined live successfully',
        data: {
          roomId,
          onlineViewers: room.viewers.size
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ===============================================================
  // HOST LIVE HOURS (HOST ONLY)
  // ===============================================================
  getHostLiveHours: async (req, res) => {
    try {
      const hostId = req.user.userId;

      // NOTE: ini mock sampai database siap
      return res.json({
        success: true,
        data: {
          todayHours: 2.5,
          todayDays: (2.5 / 3).toFixed(2),
          weekHours: 12,
          weekDays: (12 / 3).toFixed(2),
          monthHours: 45,
          monthDays: (45 / 3).toFixed(2),
          totalHours: 150,
          totalDays: (150 / 3).toFixed(2)
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};

module.exports = liveController;