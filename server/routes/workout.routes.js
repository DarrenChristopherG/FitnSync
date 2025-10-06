const controller = require("../controllers/workout.controller");

module.exports = function(app) {
  const router = require("express").Router();
  
  // All workout routes require a valid token
  // router.use(authJwt.verifyToken);

  router.post("/", controller.logWorkout);
  router.get("/", controller.getHistory);

  app.use('/api/workouts', router);
};