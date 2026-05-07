const { getDB } = require('../config/db');

const getClassCollection = () => getDB().collection('classes');

const ClassModel = {
  async getAll() {
    return await getClassCollection().find().toArray();
  },

  async getById(id) {
    const { ObjectId } = require('mongodb');
    return await getClassCollection().findOne({ _id: new ObjectId(id) });
  },

  async create(classData) {
    return await getClassCollection().insertOne(classData);
  }
};

module.exports = ClassModel;
