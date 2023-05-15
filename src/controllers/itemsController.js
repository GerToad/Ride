const Item = require("../models/item");
const {
    serverErrorLog,
    successLog,
    customLog,
    missingParamsLog
} = require("../utils/msgLogs");

exports.addItem = async (req, res) => {
  const { name, description, cost, status, userId } = req.body;
  //const userId = req.user._id; // Assuming you have implemented authentication and have access to the logged-in user's ID

  try {
    const newItem = new Item({
      name,
      description,
      cost,
      status,
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
    const itemId = req.params.id; // Assuming the item ID is passed as a URL parameter

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
  const itemId = req.params.itemId; // Assuming the item ID is passed as a URL parameter
  const updates = req.body; // Assuming the updated data is passed in the request body

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, updates);

    if (!updatedItem) {
      return customLog(res, 404, "Item not found" );
    }

    return successLog(res, "Item updated", {"status": "success", "item": item});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};
