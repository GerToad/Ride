//const { admin } = require("../util/firebaseUtil");
const User = require("../models/user");


/**
 * Creates a user in the database.
 * @param {Object} data - fields of the user
 * @param {string} data.firebaseUID - firebase uid of the user
 * @throws {Error} if the firebaseUID is not provided
 * @author gertoad
 */
exports.createUserInMongo = async (data) => {
    const user = new User(data);
    await user.save();
};

/**
 * Updates a user in the database.
 * @param {Object} data - fields of the user
 * @param {string} data._id - user id
 * @param {boolean} [data.isBlocked] - new status of the user
 * @param {string} [data.name] - new name of the user
 * @returns {Object} the updated user
 * @author gertoad
 */
exports.updateUserInMongo = async (data) => {
    const { _id, ...fields } = data;
    const updatedUser = await User.findOneAndUpdate({ _id }, fields);
    return updatedUser;
};

