const { getDB } = require('../config/db');

const getClassCollection = () => getDB().collection('classes');

const ClassModel = {
  async getAll() {
    return await getClassCollection().find({}).toArray();
  },

  async getFeatured() {
    return await getClassCollection().find({ featured: true }).toArray();
  },

  async create(classData) {
    const result = await getClassCollection().insertOne(classData);
    return { ...classData, _id: result.insertedId };
  },

  async clear() {
    return await getClassCollection().deleteMany({});
  }
};

module.exports = ClassModel;
