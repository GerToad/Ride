const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["nuevo", "viejo", "usado"],
  },
  usefulLife: {
    type: Number,
    required: true,
  },
  purchaseYear: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
