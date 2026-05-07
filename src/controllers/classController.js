const ClassModel = require('../models/classModel');

const classController = {
  async getClasses(req, res) {
    try {
      const classes = await ClassModel.getAll();
      res.status(200).json({
        success: true,
        data: classes
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getFeaturedClasses(req, res) {
    try {
      const classes = await ClassModel.getFeatured();
      res.status(200).json({
        success: true,
        data: classes
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = classController;
