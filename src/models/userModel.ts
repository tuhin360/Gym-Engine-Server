import { Collection, ObjectId } from 'mongodb';
import { getDB } from '../config/db';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string;
  role: 'member' | 'admin' | 'trainer' | 'non-member';
  image?: string;
  createdAt: Date;
}

const getUserCollection = (): Collection<IUser> => getDB().collection<IUser>('users');

export const UserModel = {
  async findByEmail(email: string): Promise<IUser | null> {
    return await getUserCollection().findOne({ email });
  },

  async findById(id: string): Promise<IUser | null> {
    return await getUserCollection().findOne({ _id: new ObjectId(id) });
  },

  async create(userData: Partial<IUser>): Promise<IUser> {
    const newUser: IUser = {
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password,
      role: (userData.role as any) || 'non-member',
      image: userData.image,
      createdAt: new Date(),
    };
    const result = await getUserCollection().insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  },

  async getAll(): Promise<IUser[]> {
    return await getUserCollection().find({}).sort({ createdAt: -1 }).toArray();
  },

  async updateRole(id: string, role: string): Promise<boolean> {
    const result = await getUserCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: role as any } }
    );
    return result.modifiedCount > 0;
  }
};
