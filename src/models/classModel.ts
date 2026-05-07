import { Collection, ObjectId } from 'mongodb';
import { getDB } from '../config/db';

export interface IGymClass {
  _id?: ObjectId;
  title: string;
  time: string;
  level: string;
  image: string;
  description: string;
  featured: boolean;
  trainer: string;
}

const getClassCollection = (): Collection<IGymClass> => getDB().collection<IGymClass>('classes');

export const ClassModel = {
  async getAll(): Promise<IGymClass[]> {
    return await getClassCollection().find({}).toArray();
  },

  async getFeatured(): Promise<IGymClass[]> {
    return await getClassCollection().find({ featured: true }).toArray();
  },

  async create(classData: IGymClass): Promise<IGymClass> {
    const result = await getClassCollection().insertOne(classData);
    return { ...classData, _id: result.insertedId };
  },

  async update(id: string, classData: Partial<IGymClass>): Promise<boolean> {
    const result = await getClassCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: classData }
    );
    return result.modifiedCount > 0;
  },

  async deleteOne(id: string): Promise<boolean> {
    const result = await getClassCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },

  async clear(): Promise<any> {
    return await getClassCollection().deleteMany({});
  }
};
