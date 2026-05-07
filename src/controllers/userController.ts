import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getAll();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateUserRole(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { role } = req.body;

      if (!['admin', 'trainer', 'member', 'non-member'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
      }

      const updated = await UserModel.updateRole(id, role);
      if (updated) {
        res.status(200).json({ success: true, message: 'User role updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
