const userData = require("../data/user");
const userRoute = require("./user");
const routes = app => {
  app.use("/user", userRoute);
};

module.exports = routes;
