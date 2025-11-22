const db = require('../config/database');
const { generateAgoraToken } = require('../utils/agoraUtils');

const liveController = {

  // =======================================================
  // START LIVE (HOST ONLY)
  // =======================================================
  startLive: async (req, res) => {
    try {
      const { title, category } = req.body;
      const hostId = req.user.userId;

      // Cek apakah host sudah live
      const active = await db.query(
        `SELECT id FROM live_rooms 
         WHERE host_id = $1 AND is_active = TRUE`,
        [hostId]
      );

      if (active.rowCount > 0) {
        return res.status(400).json({
          success: false,
          message: 'You already have an active live session'
        });
      }

      // Generate ROOM ID format DDMMYY + 4 digits
      const now = new Date();
      const d = String(now.getDate()).padStart(2, '0');
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const y = String(now.getFullYear()).slice(-2);
      const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const roomId = d + m + y + rand;

      // Agora channel + token
      const agoraChannel = `live_${roomId}`;
      const agora = generateAgoraToken(agoraChannel, hostId, 'publisher');

      await db.query(
        `INSERT INTO live_rooms 
          (id, host_id, title, category, agora_channel, agora_token, start_time, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,NOW(),TRUE)`,
        [roomId, hostId, title || 'Untitled Live', category || 'general', agoraChannel, agora.token]
      );

      return res.status(201).json({
        success: true,
        message: "Live started successfully",
        data: {
          roomId,
          hostId,
          title: title || 'Untitled Live',
          category: category || 'general',
          startTime: new Date(),
          agora
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =======================================================
  // END LIVE (HOST ONLY)
  // =======================================================
  endLive: async (req, res) => {
    try {
      const { roomId } = req.body;
      const hostId = req.user.userId;

      // Find live room
      const roomRes = await db.query(
        `SELECT * FROM live_rooms WHERE id=$1 AND is_active=TRUE`,
        [roomId]
      );

      if (roomRes.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Active live not found" });
      }

      const room = roomRes.rows[0];

      if (room.host_id !== hostId) {
        return res.status(403).json({
          success: false,
          message: "You do not own this live room"
        });
      }

      const endTime = new Date();
      const startTime = new Date(room.start_time);
      const durationSec = Math.floor((endTime - startTime) / 1000);

      // Ambil total income host dari transaksi gift
      const incomeRes = await db.query(
        `SELECT COALESCE(SUM(total_price), 0) AS income
         FROM gift_transactions
         WHERE receiver_id=$1 AND room_id=$2`,
        [hostId, roomId]
      );

      const diamondsEarned = Number(incomeRes.rows[0].income) || 0;

      // Update live room
      await db.query(
        `UPDATE live_rooms 
         SET end_time=NOW(), is_active=FALSE 
         WHERE id=$1`,
        [roomId]
      );

      return res.json({
        success: true,
        message: "Live ended successfully",
        data: {
          roomId,
          hostId,
          title: room.title,
          duration: durationSec,
          startTime,
          endTime,
          diamondsEarned
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =======================================================
  // GET ACTIVE LIVES (PUBLIC)
  // =======================================================
  getActiveLives: async (req, res) => {
    try {
      const result = await db.query(
        `SELECT id, host_id, title, category, start_time 
         FROM live_rooms
         WHERE is_active = TRUE
         ORDER BY start_time DESC`
      );

      return res.json({
        success: true,
        data: {
          lives: result.rows,
          total: result.rowCount
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =======================================================
  // GET LIVE DETAILS (PUBLIC)
  // =======================================================
  getLiveDetails: async (req, res) => {
    try {
      const { roomId } = req.params;

      const result = await db.query(
        `SELECT * FROM live_rooms WHERE id=$1`,
        [roomId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Live not found"
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

  // =======================================================
  // JOIN LIVE ROOM
  // =======================================================
  joinLive: async (req, res) => {
    try {
      const { roomId } = req.params;

      const result = await db.query(
        `SELECT id, total_viewers FROM live_rooms WHERE id=$1 AND is_active=TRUE`,
        [roomId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Live room not found"
        });
      }

      // increment viewers
      await db.query(
        `UPDATE live_rooms SET total_viewers = total_viewers + 1 WHERE id=$1`,
        [roomId]
      );

      return res.json({
        success: true,
        message: "Joined live successfully",
        data: {
          roomId,
          totalViewers: result.rows[0].total_viewers + 1
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =======================================================
  // HOST LIVE HOURS (HOST ONLY)
  // =======================================================
  getHostLiveHours: async (req, res) => {
    try {
      const hostId = req.user.userId;

      // Hitung total live time dari DB
      const liveRes = await db.query(
        `SELECT start_time, end_time 
         FROM live_rooms 
         WHERE host_id=$1 AND end_time IS NOT NULL`,
        [hostId]
      );

      let totalSeconds = 0;

      liveRes.rows.forEach(l => {
        const start = new Date(l.start_time);
        const end = new Date(l.end_time);
        totalSeconds += Math.floor((end - start) / 1000);
      });

      const totalHours = totalSeconds / 3600;
      const totalDays = totalHours / 3;

      return res.json({
        success: true,
        data: {
          totalHours: Number(totalHours.toFixed(2)),
          totalDays: Number(totalDays.toFixed(2))
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = liveController;