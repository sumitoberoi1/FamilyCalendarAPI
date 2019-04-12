const express = require("express");
const userData = require("../data/user");
const taskData = require("../data/task");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    uid,
    name,
    description,
    location,
    notes,
    isParentalControlled,
    taskDate
  } = req.body;
  const user = await userData.getUserByUID(uid);
  if (user) {
    const task = await taskData.createTask(
      user,
      name,
      description,
      location,
      notes,
      isParentalControlled,
      taskDate
    );
    res.json(task);
  } else {
    res.status(404).json({ error: e });
    return;
  }
});

module.exports = router;
