const express = require("express");
const userData = require("../data/user");
const familyData = require("../data/family");
const router = express.Router();
router.post("/createFamily", async (req, res) => {
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
        res.status = 200;
        res.json({ newfamily });
      }
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status = 404;
    res.json({ error: e });
    return;
  }
});

module.exports = router;
