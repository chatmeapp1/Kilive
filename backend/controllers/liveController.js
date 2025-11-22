const { ROLES } = require('../config/roles');
const { generateAgoraToken } = require('../utils/agoraUtils');
const db = require('../config/database');

// Temporary storage
const liveRooms = new Map(); // roomId → roomData
const hostIncome = new Map(); // hostId → income

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

      // Generate ID with format: DDMMYY + random 4 digits
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const roomId = day + month + year + random;

      // Generate Agora token
      const agoraChannel = `live_${roomId}`;
      const agoraConfig = generateAgoraToken(agoraChannel, hostId, 'publisher');

      const liveData = {
        roomId,
        hostId,
        title: title || 'Untitled Live',
        category: category || 'general',
        startTime: new Date(),
        viewers: new Set(),
        agora: agoraConfig
      };

      liveRooms.set(roomId, liveData);

      // Save to database
      try {
        await db.query(
          'INSERT INTO live_rooms (id, host_id, title, category, agora_channel, agora_token) VALUES ($1, $2, $3, $4, $5, $6)',
          [roomId, hostId, liveData.title, liveData.category, agoraChannel, agoraConfig.token]
        );
      } catch (dbError) {
        console.error('Failed to save live room to database:', dbError);
      }

      return res.status(201).json({
        success: true,
        message: 'Live started successfully',
        data: {
          roomId: liveData.roomId,
          hostId: liveData.hostId,
          title: liveData.title,
          category: liveData.category,
          startTime: liveData.startTime,
          agora: agoraConfig
        }
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