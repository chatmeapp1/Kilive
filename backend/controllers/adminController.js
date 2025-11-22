const User = require('../models/User');           // Model user
const Gift = require('../models/Gift');           // Model gift (buat nanti)
const IncomeLog = require('../models/IncomeLog'); // Model income (buat nanti)

const adminController = {

  // ============================
  // GET ALL USERS
  // ============================
  getAllUsers: async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;

      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .select('-password');

      const total = await User.countDocuments();

      res.json({
        success: true,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        total,
        users
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
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

      const updated = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json({
        success: true,
        message: `User successfully ${isActive ? 'activated' : 'suspended'}`,
        data: updated
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  
  // ============================
  // ADD NEW GIFT
  // ============================
  addGift: async (req, res) => {
    try {
      const { name, price, category, image } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Fields name, price, and category are required',
        });
      }

      const newGift = await Gift.create({
        name,
        price,
        category,
        image
      });

      res.status(201).json({
        success: true,
        message: 'Gift added successfully',
        data: newGift
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  
  // ============================
  // GET PLATFORM INCOME
  // ============================
  getAllIncome: async (req, res) => {
    try {
      const logs = await IncomeLog.find();

      let totalIncome = 0;
      let hostIncome = 0;
      let agencyIncome = 0;
      let platformIncome = 0;

      logs.forEach(log => {
        totalIncome += log.amount;
        hostIncome += log.hostAmount;
        agencyIncome += log.agencyAmount;
        platformIncome += log.platformAmount;
      });

      res.json({
        success: true,
        data: {
          totalIncome,
          hostIncome,
          agencyIncome,
          platformIncome
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
      const totalUsers = await User.countDocuments();
      const totalHosts = await User.countDocuments({ role: 'host' });
      const totalAgencies = await User.countDocuments({ role: 'agency' });

      // Kalau kamu punya model LiveSession:
      const activeLives = 0;

      const totalRevenue = await IncomeLog.aggregate([
        { $group: { _id: null, revenue: { $sum: '$platformAmount' } } }
      ]);

      res.json({
        success: true,
        data: {
          totalUsers,
          totalHosts,
          totalAgencies,
          activeLives,
          totalRevenue: totalRevenue[0]?.revenue || 0
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