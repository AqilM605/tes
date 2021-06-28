const mongose = require("mongosee")

const bindingSchema = new mongose.Schema({

    groupId: {
        type: Number
    },
    userId: {
        type: Number
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }


}, {timestamps: true})