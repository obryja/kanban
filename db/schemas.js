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
}, {
    versionKey: false
})

const boardSchema = new Schema ({
    name: {
        type: String, 
        require: true
    },
    toDO : [actionSchema],
    buffer: [actionSchema],
    working: [actionSchema], 
    done: [actionSchema],
    users: {
        type: [ObjectId],
        validate: v => Array.isArray(v) && v.length > 0,
    }
}, {
    versionKey: false
})

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    }
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