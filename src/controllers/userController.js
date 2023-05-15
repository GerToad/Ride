// Models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const {
    serverErrorLog,
    successLog,
    customLog,
    missingParamsLog
} = require("../utils/msgLogs");
const {
    createUserInMongo,
    updateUserInMongo,
} = require("../utils/usersUtil");

exports.get = async (req, res) => {
    const { id: _id } = req.params;

    const response = await User
        .exists({ _id })
        .then(async exists => {
            if (exists) {
                const response = await User
                    .findById(_id)
                    .lean()
                    .exec()
                    .then(user => successLog(res, "Record found", { user }))
                    .catch(err => {
                        console.log(err);
                        return serverErrorLog(res, err);
                    });
                return response;
            } else {
                return customLog(res, 400, "No matching records");
            }
        })
        .catch(err => {
            console.log(err);
            return serverErrorLog(res, err);
        });
    return response;
};

exports.create = async (req, res) => {

    let { email, name, password } = req.body;


    if (!password || !email) {
        return customLog(res, 400, "Email and password required");
    }

    const userExistsMongo = await User.exists({ email });

    if (userExistsMongo) {
        return customLog(res, 409, "User with this email already exists");
    }
    
    // Generate a salt to use in the hash
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    userData = {"email": email, "name": name, "password": hashedPassword}
    try {
        await createUserInMongo(userData);
        return successLog(res, `User with email: ${email} created successfully`, {"status": "success"});
    } catch (err) {
        console.log(err);
        return serverErrorLog(res, err);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return missingParamsLog(res);
    }

    try {
        const user = await User.findOne({ email }).lean().exec();

        if (!user) {
            return customLog(res, 400, "User with this email does not exist");
        }

        if (user.isBlocked) {
            return customLog(res, 403, "You do not have access to this site");
        }

        // Generate a salt to use in the hash
        //const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        //const hashedPassword = await bcrypt.hash(password, 10);
        const isMatch = bcrypt.compare(password, user.password);

        //console.log("Entered password:", hashedPassword);
        //console.log("Stored hashed password:", user.password);
        //console.log(user.password == hashedPassword)
        if (!isMatch) {
            return customLog(res, 403, "Wrong password");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "1234", { expiresIn: '1h' });

        return successLog(res, "Successful login", { user, token });
    } catch (err) {
        console.log(err);
        return serverErrorLog(res, err);
    }  
};

exports.update = async (req, res) => {
    const { id: _id } = req.params;
    let { name, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    
	bcrypt.hash(password, 10, (err, hash) => {
        if (err){
            return serverErrorLog(res, err);
        } 
        else{
            updateData.password = hash;
            console.log(updateData)
        }
    });

    if (Object.keys(updateData).length === 0)
        return customLog(res, 400, "Empty body");

    const userExists = await User.exists({ _id });

    if (!userExists) {
        return customLog(res, 400, "User doesn't exist");
    }

    let updatedUser = {};
    try {
        updatedUser = await updateUserInMongo({ ...updateData, _id });
        return successLog(res, "Update success", {"status": "success", updatedUser})
    } catch (error) {
        console.log("error", error);
        return serverErrorLog(res, error);
    }
};

exports.delete = async (req, res) => {

    const { id: _id } = req.params;

    if (!_id)
        return missingParamsLog(res);

    try {
        await User.deleteOne({ _id });
    } catch (error) {
        console.log("error", error);
        return serverErrorLog(res, error);
    }
};
