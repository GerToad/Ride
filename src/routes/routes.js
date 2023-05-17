const express = require("express");
const routesController = require("../controllers/routesController");
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

//router.use(authenticateToken);
router.post("/add", routesController.add);
router.get("/getRoute", routesController.getRoute);
router.get("/getAll", routesController.getAll);
router.patch("/edit", routesController.edit);

module.exports = router;
