const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({


    groupName: {
        type: String,
        required: true
    },
    groupType: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Group", groupsSchema);
