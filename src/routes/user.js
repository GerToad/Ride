const express = require("express");
const userController = require("../controllers/userController");
//const { isAuthenticated, isAuthorized } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", userController.login);
//router.get("/reference", isAuthenticated, userController.getReference);
router.get("/:id", userController.get);

//router.use(isAuthenticated);
//router.use(isAuthorized({ allowedRoles: ["Admin"] }));

router.post("/create", userController.create);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);
//router.get("/", userController.getAll);

module.exports = router;
