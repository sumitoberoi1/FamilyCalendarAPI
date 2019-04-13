const express = require("express");
const userData = require("../data/user");
const taskData = require("../data/task");
const familyData = require("../data/family");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    uid,
    name,
    description,
    location,
    isParentalControlled,
    taskDate,
    familyCode
  } = req.body;
  const user = await userData.getUserByUID(uid);
  const family = await familyData.getFamilyWithCode(familyCode);
  if (user) {
    const task = await taskData.createTask(
      user,
      name,
      description,
      location,
      isParentalControlled,
      taskDate,
      family
    );
    res.json(task);
  } else {
    res.status(404).send({ error: e });
    return;
  }
});

module.exports = router;
