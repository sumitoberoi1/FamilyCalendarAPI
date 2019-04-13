const mongoCollections = require("../../config/mongoCollections");
const tasks = mongoCollections.tasks;

const createTask = async (
  user,
  taskName,
  taskDescription,
  taskLocation,
  isParentalControlled,
  taskDate,
  family
) => {
  try {
    const taskCollection = await tasks();
    const saveTask = {
      creater: user,
      taskName,
      taskDescription,
      taskLocation,
      isParentalControlled,
      taskDate,
      family
    };
    const { insertedId } = await taskCollection.insertOne(saveTask);
    return await taskCollection.findOne({ _id: insertedId });
  } catch (e) {
    throw e;
  }
};

const getTaskByID = async id => {
  try {
    if (!id || typeof id != "string") {
      throw "Invalid ID";
    }
    let taskCollection = await tasks();
    let task = await taskCollection.findOne({ id: id });
    return task;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createTask,
  getTaskByID
};
