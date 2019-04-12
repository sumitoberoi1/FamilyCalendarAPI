const express = require("express");
const userData = require("../data/user");
const familyData = require("../data/family");
const router = express.Router();
router.post("/", async (req, res) => {
  const { code, name, uid } = req.body;
  try {
    let user = await userData.getUserByUID(uid);
    if (user) {
      let family = await familyData.getFamilyWithCode(code);
      if (family) {
        error_message = "Family With Code already exist";
        res.status = 409;
        res.json({ error: error_message });
      } else {
        let newfamily = await familyData.createFamilyWithNameAndCode(
          code,
          name,
          user
        );
        let user = await userData.addFamily(uid, newfamily);
        res.status = 200;
        res.json(user);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(404).send({ error: e });
    return;
  }
});

router.post("/invite", async (req, res) => {
  const { email, uid, code } = req.body;
  try {
    let user = await userData.getUserByUID(uid);
    if (user) {
      let family = await familyData.getFamilyWithCode(code);
      if (family) {
      } else {
        res.status = 404;
        res.json({ error: "Family not found" });
      }
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(404).send({ error: e });
    return;
  }
});

router.post("/join", async (req, res) => {
  const { code, uid } = req.body;
  try {
    let user = await userData.getUserByUID(uid);
    if (user) {
      let existingFamily = await familyData.getFamilyWithCode(code);
      if (existingFamily) {
        existingFamily = await familyData.joinFamily(code, user);
        let user = await userData.addFamily(uid, existingFamily);
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(404).send({ error: e });
    return;
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params.id;
});

module.exports = router;
