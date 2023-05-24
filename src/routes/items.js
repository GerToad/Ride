const express = require("express");
const itemsController = require("../controllers/itemsController");
const router = express.Router();

router.use((req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    // Token is not provided
    return customLog(res, 401, "Missing token!");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, '1234');

    // Attach the decoded token payload to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    //return res.status(401).json({ message: 'Access denied. Invalid token.' });
        return customLog(res, 404, "Access denied. Invalid token.", error);
  }
});

router.post("/add", itemsController.addItem);
router.get("/getItem", itemsController.getItem);
router.get("/getAll", itemsController.getAll);
router.patch("/edit", itemsController.edit);
router.delete("/delete", itemsController.delete);

module.exports = router;
