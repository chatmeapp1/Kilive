const { ROLES } = require('../config/roles');

// Temporary memory storage
const gifts = new Map();
const giftHistory = [];
const hostIncome = new Map();   // hostId → income number
const userCoins = new Map();    // userId → coins number

// JP Milestones
const JP_MILESTONES = [20, 50, 100, 200, 300, 500];

const giftController = {

  // =====================================================
  // GET ALL GIFTS
  // =====================================================
  getAllGifts: async (req, res) => {
    try {
      // Example categories (replace with DB later)
      res.json({
        success: true,
        data: {
          normal: [
            { id: '1', name: 'Flower', price: 100, image: 'flower.png' },
            { id: '2', name: 'Duck', price: 500, image: 'duck.png' }
          ],
          lucky: [
            { id: '3', name: 'Lucky Star', price: 200, image: 'star.png' },
            { id: '4', name: 'Carousel', price: 1000, image: 'carousel.png' }
          ],
          "j-lucky": [
            { id: '5', name: 'J-Dragon', price: 300, image: 'dragon.png' },
            { id: '6', name: 'J-Phoenix', price: 500, image: 'phoenix.png' }
          ],
          luxury: [
            { id: '7', name: 'Yacht', price: 1000000, image: 'yacht.png' },
            { id: '8', name: 'Castle', price: 500000, image: 'castle.png' }
          ]
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // SEND GIFT
  // =====================================================
  sendGift: async (req, res) => {
    try {
      const { giftId, combo, receiverId } = req.body;
      const userId = req.user.userId;

      if (!gifts.has(giftId)) {
        return res.status(400).json({
          success: false,
          message: 'Gift not found'
        });
      }

      const gift = gifts.get(giftId);
      const totalCost = gift.price * combo;

      // Ensure user balance exists
      const userBalance = userCoins.get(userId) || 0;
      if (totalCost > userBalance) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient coins'
        });
      }

      // Deduct coins from sender
      userCoins.set(userId, userBalance - totalCost);

      let hostGet = 0;
      let jackpotReward = 0;
      let luxuryLayer = false;

      // ===========================
      // NORMAL GIFT 100% → HOST
      // ===========================
      if (gift.category === 'normal') {
        hostGet = totalCost;

      // ===========================
      // LUCKY / J-LUCKY → HOST 10%
      // ===========================
      } else if (gift.category === 'lucky' || gift.category === 'j-lucky') {
        hostGet = Math.floor(totalCost * 0.1);

        // JP Logic
        if (JP_MILESTONES.includes(combo)) {
          jackpotReward = gift.price * 10; // JP reward
          userCoins.set(userId, (userCoins.get(userId) || 0) + jackpotReward);
        }

        // S-Lucky = Double total reward
        if (gift.category === 'j-lucky') {
          jackpotReward += totalCost; // Double reward for spender
          userCoins.set(userId, (userCoins.get(userId) || 0) + totalCost);
        }

      // ===========================
      // LUXURY GIFTS
      // ===========================
      } else if (gift.category === 'luxury') {
        luxuryLayer = true;

        // If ≥ 1M → host gets 50%
        if (gift.price >= 1000000) {
          hostGet = Math.floor(totalCost * 0.5);
        } else {
          hostGet = Math.floor(totalCost * 0.1);
        }
      }

      // Add host income
      hostIncome.set(receiverId, (hostIncome.get(receiverId) || 0) + hostGet);

      // Save history
      giftHistory.push({
        id: Date.now().toString(),
        userId,
        receiverId,
        giftId,
        combo,
        totalCost,
        hostIncome: hostGet,
        jackpotReward,
        luxuryLayer,
        createdAt: new Date()
      });

      return res.json({
        success: true,
        message: 'Gift sent successfully',
        data: {
          giftId,
          combo,
          totalCost,
          hostIncome: hostGet,
          jackpotReward,
          luxuryLayer
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // =====================================================
  // GET GIFT HISTORY BY USER
  // =====================================================
  getGiftHistory: async (req, res) => {
    try {
      const { userId } = req.query;

      const filtered = giftHistory.filter(h => h.userId === userId);

      return res.json({
        success: true,
        data: filtered
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = giftController;