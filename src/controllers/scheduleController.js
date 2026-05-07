const ScheduleModel = require('../models/scheduleModel');

const scheduleController = {
  async getSchedules(req, res) {
    try {
      const schedules = await ScheduleModel.getAll();
      res.status(200).json({
        success: true,
        data: schedules
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = scheduleController;
