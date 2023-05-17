const express = require("express");
const itemsController = require("../controllers/itemsController");
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

//router.use(authenticateToken);
router.post("/add", itemsController.addItem);
router.get("/getItem", itemsController.getItem);
router.get("/getAll", itemsController.getAll);
router.patch("/edit", itemsController.edit);

module.exports = router;
