const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

usersSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

usersSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}
module.exports = mongoose.model("User", usersSchema);
