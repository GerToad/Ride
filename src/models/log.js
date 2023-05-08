const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    // email of the user who modified the document
    modifiedBy: String,
    // currently only "edit" and "merge"
    operation: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies"
    },
    fund: {
        type: Schema.Types.ObjectId,
        ref: "funds"
    },
    proposal: {
        type: Schema.Types.ObjectId,
        ref: "meetings"
    },
    // data previous to the operation
    prevData: {

    },
    // data after to the operation
    newData: {

    }
}, { timestamps: true });

module.exports = mongoose.model("logs", LogSchema);