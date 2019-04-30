const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var studentSchema = new Schema ({
    firstName: String,
    lastName: String,
    rollNo: Number
});

let student = module.exports = mongoose.model("Student",studentSchema);