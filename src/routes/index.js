const userRoute = require("./user");
const familyRoute = require("./family");
const taskRoute = require("./task");
const routes = app => {
  app.use("/user", userRoute);
  app.use("/family", familyRoute);
  app.use("/tasks", taskRoute);
};

module.exports = routes;
