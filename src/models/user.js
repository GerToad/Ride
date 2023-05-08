const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: String,
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    },
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = model("users", UserSchema);
