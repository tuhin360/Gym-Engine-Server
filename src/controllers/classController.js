const ClassModel = require('../models/classModel');

const classController = {
  async getAllClasses(req, res) {
    try {
      const classes = await ClassModel.getAll();
      res.status(200).json({
        success: true,
        data: classes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async createClass(req, res) {
    try {
      const result = await ClassModel.create(req.body);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = classController;
