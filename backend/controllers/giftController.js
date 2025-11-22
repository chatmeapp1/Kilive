const db = require('../db');

const JP_MILESTONES = [20, 50, 100, 200, 300, 500];

const giftController = {

  // =====================================================
  // GET ALL GIFTS
  // =====================================================
  getAllGifts: async (req, res) => {
    try {
      const result = await db.query(`SELECT * FROM gifts ORDER BY price ASC`);

      const normal = [];
      const lucky = [];
      const jLucky = [];
      const luxury = [];

      result.rows.forEach(g => {
        if (g.category === 'normal') normal.push(g);
        else if (g.category === 'lucky') lucky.push(g);
        else if (g.category === 'j-lucky') jLucky.push(g);
        else if (g.category === 'luxury') luxury.push(g);
      });

      res.json({
        success: true,
        data: {
          normal,
          lucky,
          "j-lucky": jLucky,
          luxury
        }
      });

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // SEND GIFT
  // =====================================================
  sendGift: async (req, res) => {
    const client = await db.pool.connect();

    try {
      const { giftId, combo, receiverId, roomId } = req.body;
      const senderId = req.user.userId;

      await client.query('BEGIN');

      // 1. Get gift
      const giftRes = await client.query(
        `SELECT * FROM gifts WHERE id=$1`,
        [giftId]
      );

      if (giftRes.rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, message: 'Gift not found' });
      }

      const gift = giftRes.rows[0];
      const totalCost = gift.price * combo;

      // 2. Check user coins
      const userRes = await client.query(
        `SELECT coins FROM users WHERE id=$1`,
        [senderId]
      );

      const userCoins = Number(userRes.rows[0].coins || 0);

      if (userCoins < totalCost) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: 'Insufficient coins'
        });
      }

      // 3. Deduct coins from sender
      await client.query(
        `UPDATE users SET coins = coins - $1 WHERE id=$2`,
        [totalCost, senderId]
      );

      let hostGet = 0;
      let jackpotReward = 0;
      let luxuryLayer = false;

      // =======================
      // NORMAL GIFT → host 100%
      // =======================
      if (gift.category === 'normal') {
        hostGet = totalCost;
      }

      // ===================================
      // LUCKY / J-LUCKY GIFTS → host 10%
      // ===================================
      else if (gift.category === 'lucky' || gift.category === 'j-lucky') {
        hostGet = Math.floor(totalCost * 0.1);

        // JP REWARD
        if (JP_MILESTONES.includes(combo)) {
          jackpotReward = gift.price * 10;
        }

        // j-lucky = bonus double
        if (gift.category === 'j-lucky') {
          jackpotReward += totalCost; // tambahan 1x total gift
        }

        if (jackpotReward > 0) {
          await client.query(
            `UPDATE users SET coins = coins + $1 WHERE id=$2`,
            [jackpotReward, senderId]
          );
        }
      }

      // ==========================
      // LUXURY GIFTS
      // ==========================
      else if (gift.category === 'luxury') {
        luxuryLayer = true;

        if (gift.price >= 1000000) {
          hostGet = Math.floor(totalCost * 0.5);
        } else {
          hostGet = Math.floor(totalCost * 0.1);
        }
      }

      // 4. Add host income (diamonds)
      await client.query(
        `UPDATE users SET diamonds = diamonds + $1 WHERE id=$2`,
        [hostGet, receiverId]
      );

      // Also update host total income field
      await client.query(
        `UPDATE users SET total_income = total_income + $1 WHERE id=$2`,
        [hostGet, receiverId]
      );

      // 5. Save gift transaction
      const txRes = await client.query(
        `INSERT INTO gift_transactions 
          (sender_id, receiver_id, gift_id, room_id, combo, total_price)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, created_at`,
        [senderId, receiverId, giftId, roomId, combo, totalCost]
      );

      await client.query('COMMIT');

      return res.json({
        success: true,
        message: 'Gift sent successfully',
        data: {
          transactionId: txRes.rows[0].id,
          giftId,
          combo,
          totalCost,
          hostIncome: hostGet,
          jackpotReward,
          luxuryLayer,
          createdAt: txRes.rows[0].created_at
        }
      });

    } catch (error) {
      await client.query('ROLLBACK');
      return res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      client.release();
    }
  },

  // =====================================================
  // GIFT HISTORY
  // =====================================================
  getGiftHistory: async (req, res) => {
    try {
      const { userId } = req.query;

      const historyRes = await db.query(
        `SELECT * FROM gift_transactions 
         WHERE sender_id=$1 
         ORDER BY created_at DESC`,
        [userId]
      );

      return res.json({
        success: true,
        data: historyRes.rows
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = giftController;