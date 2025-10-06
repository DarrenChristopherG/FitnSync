const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  // This middleware is for setting headers, which is fine
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // CHECK THIS LINE CAREFULLY
  app.post("/api/auth/signup", controller.signup);

  // AND THIS ONE
  app.post("/api/auth/signin", controller.signin);
};