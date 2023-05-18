const Item = require("../models/item");
const {
    serverErrorLog,
    successLog,
    customLog,
    missingParamsLog
} = require("../utils/msgLogs");

exports.addItem = async (req, res) => {
  const { name, description, cost, status, userId, usefulLife, purchaseYear } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      cost,
      status,
      usefulLife,
      purchaseYear,
      userId,
    });

    const savedItem = await newItem.save();
    return successLog(res, "Item added", {"status": "success"});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.getItem = async (req, res) => {
    const itemId = req.query.id; // Assuming the item ID is passed as a URL parameter

  try {
    const item = await Item.findById(itemId);
    
    if (!item) {
        return missingParamsLog(res);
    }

    return successLog(res, "Item", {"status": "success", "item": item});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.getAll = async (req, res) => {
    const userId = req.query.id; // Assuming the user ID is passed as a URL parameter
  try {
    const items = await Item.find({ userId });
    
    return successLog(res, "Items", {"status": "success", "items": items});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.edit = async (req, res) => {
  const updates = req.body; // Assuming the updated data is passed in the request body
  const { _id: id, ...item } = updates;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item);

    if (!updatedItem) {
      return customLog(res, 404, "Item not found" );
    }

    return successLog(res, "Item updated", {"status": "success", "item": item});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};
