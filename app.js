const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const userRoutes = require("./src/routes/user");
const itemRoutes = require("./src/routes/items");
const routesRoutes = require("./src/routes/routes");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRoutes);
app.use("/item", itemRoutes);
app.use("/route", routesRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ride', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
