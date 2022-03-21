const { ObjectId } = require("bson")
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const actionSchema = new Schema ({
    content: {
        type: String, 
        require: true
    },
    difficulty: {
        type: String, 
        require: true
    },
})

const boardSchema = new Schema ({
    toDO : [actionSchema],
    buffer: [actionSchema],
    working: [actionSchema], 
    done: [actionSchema],
    users: [ObjectId],
})

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    boards: [ObjectId]
}, {
    versionKey: false
})

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }
}, {
    versionKey: false
})

const Board = new mongoose.model('Board', boardSchema)
const User = new mongoose.model('User', userSchema)
const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema)

module.exports = {
    Board,
    User,
    RefreshToken,
}