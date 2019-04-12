const express = require("express");
const userData = require("../data/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, isAdult } = req.body;
  try {
    let user = await userData.getUserByEmail(email);
    if (user) {
      error_message = "User with email already exists";
      res.status = 409;
      res.json({ error: error_message });
    } else {
      let user = await userData.createUserWithEmail(email, password, isAdult);
      res.status = 200;
      res.json(user);
    }
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userData.authenticateUserWithEmailAndPassword(
      email,
      password
    );
    res.status = 200;
    res.json(user);
  } catch (e) {
    res.status(404).send({ error: e });
    return;
  }
});

router.get("/:id", async (req, res) => {
  const uid = req.params.id;
  try {
    let user = await userData.getUserByUID(uid);
    res.status = 200;
    res.json(user);
  } catch (e) {
    res.status(404).send({ error: e });
    return;
  }
});

module.exports = router;
