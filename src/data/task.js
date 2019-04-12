const mongoCollections = require("../../config/mongoCollections");
const tasks = mongoCollections.tasks;

const createTask = async (
  user,
  taskName,
  taskDescription,
  taskLocation,
  taskNotes,
  isChildSafe,
  taskDate
) => {
  try {
    const taskCollection = await tasks();
    const saveTask = {
      creater: user,
      taskName,
      taskDescription,
      taskLocation,
      taskNotes,
      isChildSafe,
      taskDate
    };
    const task = await taskCollection.insertOne(saveTask);
    return await taskCollection.findOne({ _id: task.insertedId });
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
