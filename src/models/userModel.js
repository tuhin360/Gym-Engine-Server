const { getDB } = require('../config/db');

const getUserCollection = () => getDB().collection('users');

const UserModel = {
  async findByEmail(email) {
    return await getUserCollection().findOne({ email });
  },

  async findById(id) {
    const { ObjectId } = require('mongodb');
    return await getUserCollection().findOne({ _id: new ObjectId(id) });
  },

  async create(userData) {
    const newUser = {
      ...userData,
      role: userData.role || 'member',
      createdAt: new Date(),
    };
    const result = await getUserCollection().insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }
};

module.exports = UserModel;
