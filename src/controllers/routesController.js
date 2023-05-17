const Route = require("../models/route");
const {
    serverErrorLog,
    successLog,
    customLog,
    missingParamsLog
} = require("../utils/msgLogs");

exports.add = async (req, res) => {
  const { name, description, driver, issues, userId } = req.body;

  try {
    const newRoute = new Route({
      name,
      description,
      driver,
      issues,
      userId,
    });

    await newRoute.save();
    return successLog(res, "Item added", {"status": "success"});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.getRoute = async (req, res) => {
    const routeId = req.query.id; // Assuming the item ID is passed as a URL parameter

  try {
    const route = await Route.findById(routeId);
    
    if (!route) {
        return missingParamsLog(res);
    }

    return successLog(res, "Route", {"status": "success", "route": route});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.getAll = async (req, res) => {
    const userId = req.query.id; // Assuming the user ID is passed as a URL parameter
  try {
    const routes = await Route.find({ userId });
    
    return successLog(res, "Routes", {"status": "success", "routes": routes});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};

exports.edit = async (req, res) => {
  const updates = req.body; // Assuming the updated data is passed in the request body
  const { _id: id, ...route } = updates;

  try {
    const updatedRoute = await Route.findByIdAndUpdate(id, route);

    if (!updatedRoute) {
      return customLog(res, 404, "Route not found" );
    }

    return successLog(res, "Route updated", {"status": "success", "route": route});
  } catch (error) {
    console.log(error);
    return serverErrorLog(res, error);
  }
};
