import { Request, Response } from 'express';
import { ScheduleModel } from '../models/scheduleModel';

export const scheduleController = {
  async getSchedules(req: Request, res: Response) {
    try {
      const schedules = await ScheduleModel.getAll();
      res.status(200).json({
        success: true,
        data: schedules
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createSchedule(req: Request, res: Response) {
    try {
      const newSchedule = await ScheduleModel.create(req.body);
      res.status(201).json({ success: true, data: newSchedule });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await ScheduleModel.update(id as string, req.body);
      if (updated) {
        res.status(200).json({ success: true, message: 'Schedule updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Schedule not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ScheduleModel.deleteOne(id);
      if (deleted) {
        res.status(200).json({ success: true, message: 'Schedule deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Schedule not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
