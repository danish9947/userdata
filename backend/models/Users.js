const mongoose = require('mongoose');
const { Schema } = mongoose


const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
})
const Users = mongoose.model("Users", usersSchema)

module.exports = Users