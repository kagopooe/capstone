const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
// const users = require("../controllers/user.controller")
let router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  let users = require("../controllers/user.controller")
  
  //retrieve all users
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);

  //retrieve a single user by id
  router.get("/:id", authJwt.verifyToken, users.findOne);

  //update a user by id
  router.put("/:id", authJwt.verifyToken, users.update);

  //delete a user by id
  router.delete("/:id", authJwt.verifyToken, users.delete);

  //delete all users
  router.delete("/", authJwt.verifyToken, users.deleteAll)

  app.use("/api/test/users" , router)
}
// };
