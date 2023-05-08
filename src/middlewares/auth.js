const { admin } = require("../util/firebaseUtil");
const { customLog } = require("../util/msgLogs");

/**
 * Middleware that verifies the token
 * @param {Object} req - express req object
 * @param {Object} req.headers - object containing the predefined/custom header given in the current request
 * @param {string} req.headers.authorization - bearer token
 * @param {Object} res - express res object
 * @param {Object} res.locals - local variables saved from authentication
 * @param {Function} next - express next middleware function
 * @returns the next function if the token is valid
 * @author  Medina192
 */
exports.isAuthenticated = async (req, res, next) => {

    if (process.env.NODE_ENV === "development") {
        return next();
    }

    const { authorization } = req.headers;

    if (!authorization)
        return customLog(res, 401, "The header was not sent");

    if (!authorization.startsWith("Bearer"))
        return customLog(res, 401, "The token is not in the bearer field");

    const split = authorization.split("Bearer ");
    if (split.length !== 2)
        return customLog(res, 401, "The header does not have the token");

    const token = split[1];
    //console.log('token', token);
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        //console.log('decoded', decodedToken);
        res.locals = { ...res.locals, uid: decodedToken.uid, email: decodedToken.email, rolesFromToken: decodedToken.role };
        return next();
    } catch (err) {
        console.error(`${err.code} -  ${err.message}`);
        return customLog(res, 400, "error decoding the token");
    }
};

/**
 * Middleware that verifies the role.
 * @param {string[]} allowedRoles - list of allowed roles
 * @returns the next function if the role in the user token is allowed
 * @author  Medina192
 */
exports.isAuthorized = ({ allowedRoles }) => {
    return async (req, res, next) => {
        const { NODE_ENV } = process.env;
        const { rolesFromToken } = res.locals;
        if (NODE_ENV === "production" || rolesFromToken.some(r => allowedRoles.includes(r)))
            return next();
        else
            return customLog(res, 403, "Unauthorized Role");
    };
};
