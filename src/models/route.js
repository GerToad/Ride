const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RouteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    driver: {type: String, required: true},
    issues: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = model("routes", RouteSchema);
