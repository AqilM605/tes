const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({


        userName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,

        },


    }, {timestamps: true}
    )
;

module.exports = mongoose.model("User", usersSchema);
