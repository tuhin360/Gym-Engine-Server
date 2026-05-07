import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { ClassModel } from '../models/classModel';

export const analyticsController = {
  async getDashboardStats(req: Request, res: Response) {
    try {
      // 1. Fetch all data for aggregation
      const users = await UserModel.getAll();
      const classes = await ClassModel.getAll();

      // 2. Membership Breakdown
      const membershipData = {
        admin: users.filter(u => u.role === 'admin').length,
        trainer: users.filter(u => u.role === 'trainer').length,
        member: users.filter(u => u.role === 'member').length,
        nonMember: users.filter(u => u.role === 'non-member').length,
      };

      // 3. Class Intensity Breakdown
      const classData = {
        beginner: classes.filter(c => c.level === 'Beginner').length,
        intermediate: classes.filter(c => c.level === 'Intermediate').length,
        advanced: classes.filter(c => c.level === 'Advanced').length,
        all: classes.filter(c => c.level === 'All Levels').length,
      };

      // 4. Growth Trends (Last 6 Months)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = new Date().getMonth();
      
      const trends = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - i + 12) % 12;
        const count = users.filter(u => {
          if (!u.createdAt) return false;
          const userDate = new Date(u.createdAt);
          return !isNaN(userDate.getTime()) && userDate.getMonth() === monthIndex;
        }).length;
        
        return {
          month: months[monthIndex],
          users: count
        };
      }).reverse();

      res.status(200).json({
        success: true,
        data: {
          totalUsers: users.length,
          totalClasses: classes.length,
          membershipData,
          classData,
          trends
        }
      });
    } catch (error: any) {
      console.error("Analytics Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
