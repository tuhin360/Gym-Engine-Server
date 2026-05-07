import { Collection, ObjectId } from 'mongodb';
import { getDB } from '../config/db';

export interface ISchedule {
  _id?: ObjectId;
  name: string;
  trainer: string;
  schedules: {
    [key: string]: string;
  };
}

const getScheduleCollection = (): Collection<ISchedule> => getDB().collection<ISchedule>('schedules');

export const ScheduleModel = {
  async getAll(): Promise<ISchedule[]> {
    return await getScheduleCollection().find({}).toArray();
  },

  async create(scheduleData: ISchedule): Promise<ISchedule> {
    const result = await getScheduleCollection().insertOne(scheduleData);
    return { ...scheduleData, _id: result.insertedId };
  },

  async update(id: string, scheduleData: Partial<ISchedule>): Promise<boolean> {
    const result = await getScheduleCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: scheduleData }
    );
    return result.modifiedCount > 0;
  },

  async deleteOne(id: string): Promise<boolean> {
    const result = await getScheduleCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },

  async clear(): Promise<any> {
    return await getScheduleCollection().deleteMany({});
  }
};
