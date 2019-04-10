const express = require("express");
const logger = require("morgan");
const configRoutes = require("../src/routes");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("../config/firebase");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configRoutes(app);
app.listen(3001, () => {
  firebase.initializeFirebase();
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
  if (process && process.send) process.send({ done: true });
});
