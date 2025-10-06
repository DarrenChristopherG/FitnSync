
// const { authJwt } = require("../middleware");
const controller = require("../controllers/exercise.controller");

module.exports = function(app) {
  const router = require("express").Router();
  router.get("/", controller.findAll);
  // Optional: Protect the creation of new exercises
  // router.post("/", [authJwt.verifyToken], controller.create);
  app.use('/api/exercises', router);
};