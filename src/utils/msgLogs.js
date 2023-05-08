/**
 * <p>Sends an http response object with a message and the stringyfied error 
 * for server-side errors.</p>
 * @param {Object} res - express res object
 * @param {Object} err - javascript Error object
 * @returns the response
 */
exports.serverErrorLog = (res, err) => res.status(500).json({
    message: "An error occurred while processing the request",
    error: err.message
});

/**
 * <p>Sends an http response object with a message and a results object 
 * for requests with no errors.</p>
 * @param {Object} res - express res object
 * @param {string} message - success custom mesage
 * @param {Object} results - object with the requested data
 * @returns the response
 */
exports.successLog = (res, message, results = {}) => res.status(200).json({
    message,
    ...results
});

/**
 * <p>Sends an http response object with a "Missing parameter(s)" message 
 * for bad requests missing parameters. The http code for this type of requests 
 * will always be 400.</p>
 * @param {Object} res - express res object
 * @returns the response
 */
exports.missingParamsLog = (res) => res.status(400).json({
    message: "Missing parameter(s)"
});

/**
 * <p>Sends an http response object with a message and a results object 
 * for requests with errors from client data. This function lets a custom http error 
 * code to be chosen.</p>
 * @param {Object} res - express res object
 * @param {number} code - http error code
 * @param {string} message - custom mesage
 * @param {Object} results - object with response data
 * @returns the response
 */
exports.customLog = (res, code, message, results = {}) => res.status(code).json({
    message,
    ...results
});
