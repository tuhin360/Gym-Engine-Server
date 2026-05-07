const { getDB } = require('../config/db');

const getScheduleCollection = () => getDB().collection('schedules');

const ScheduleModel = {
  async getAll() {
    return await getScheduleCollection().find({}).toArray();
  },

  async create(scheduleData) {
    const result = await getScheduleCollection().insertOne(scheduleData);
    return { ...scheduleData, _id: result.insertedId };
  },

  async clear() {
    return await getScheduleCollection().deleteMany({});
  }
};

module.exports = ScheduleModel;
