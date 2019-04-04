const userData = require("../data/user");
const userRoute = require("./user");
const familyRoute = require("./family");
const routes = app => {
  app.use("/user", userRoute);
  app.use("/family", familyRoute);
};

module.exports = routes;
