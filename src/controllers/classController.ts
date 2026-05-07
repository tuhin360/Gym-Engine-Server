import { Request, Response } from 'express';
import { ClassModel } from '../models/classModel';

export const classController = {
  async getClasses(req: Request, res: Response) {
    try {
      const classes = await ClassModel.getAll();
      res.status(200).json({
        success: true,
        data: classes
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getFeaturedClasses(req: Request, res: Response) {
    try {
      const classes = await ClassModel.getFeatured();
      res.status(200).json({
        success: true,
        data: classes
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createClass(req: Request, res: Response) {
    try {
      const newClass = await ClassModel.create(req.body);
      res.status(201).json({ success: true, data: newClass });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateClass(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await ClassModel.update(id, req.body);
      if (updated) {
        res.status(200).json({ success: true, message: 'Class updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Class not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteClass(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ClassModel.deleteOne(id);
      if (deleted) {
        res.status(200).json({ success: true, message: 'Class deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Class not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
