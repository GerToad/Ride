const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/login", userController.login);
router.get("/:id", userController.get);
const md_auth = require("../middlewares/auth");


router.post("/create", userController.create);
//router.use(md_auth.authenticateToken);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);
//router.get("/", userController.getAll);

module.exports = router;
