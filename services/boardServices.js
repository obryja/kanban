const async = require('hbs/lib/async')
const Board = require('../db/schemas').Board
const User = require('../db/schemas').User

getBoard = async(req, res) => {
    try{
        if(!req.body.id)  return res.sendStatus(400)

        res.status(202).send(JSON.stringify(
            await Board.findById(req.body.id).lean()
        ))
    } catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

getBoardsOfUser = async(req, res) => {
    try{
        if(!req.cookies.userInfo.userId){
            return res.sendStatus(400)
        } else{
            res.status(202).send(JSON.stringify(
                await Board.find({users: req.cookies.userInfo.userId}).lean()
        ))
        }
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

addBoard = async(req, res) => {
    try{
        if(!req.body.name || !req.cookies.userInfo.userId){
            return res.sendStatus(400)
        } else{
            const board = new Board({
                name: req.body.name,
                users: req.cookies.userInfo.userId, 
            })
            await board.save()

            res.status(202).send(JSON.stringify(board))
        }
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/************* update board *************/

updateBoard = async (req, res) => {
    try {
        if(!req.body.id)    return res.sendStatus(403)

       // try to find board with given id in database
        const board = await Board.findById(req.body.id)
        if(!board)  return res.sendStatus(404)

        // if one of the given data is falsy, corresponding value won't change
        board.name = req.body.name || board.name
        if(req.body.users)    board.users.addToSet(req.body.users)
        if(req.body.toDo && req.body.toDo.content && req.body.toDo.difficulty)   board.toDo.push(req.body.toDo)
        if(req.body.buffer && req.body.buffer.content && req.body.buffer.difficulty)    board.buffer.push(req.body.buffer )
        if(req.body.working && req.body.working.content && req.body.working.difficulty)    board.working.push(req.body.working)
        if(req.body.done && req.body.done.content && req.body.done.difficulty)    board.done.push(req.body.done)

        await board.save()

        res.status(202).send(JSON.stringify(board))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/************* deleting board *************/

deleteBoard = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(403)

        Board.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(400)
            
            res.sendStatus(202)
        })
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/*********** add user to board ***********/

addUserToBoard = async (req, res) => {
    try {
        if (!req.body.username) return res.sendStatus(400)
        if(!req.body.id)    return res.sendStatus(403)

        const user = await User.findOne({ username: req.body.username }).lean()

        // Check if user was found
        if (!user) return res.status(404).send()

       // try to find board with given id in database
        const board = await Board.findById(req.body.id)
        if(!board)  return res.sendStatus(404)

        board.users.addToSet(user._id)

        await board.save()

        res.status(202).send(JSON.stringify(board))

    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}


checkAccess = async (req, res, next) => {
    try {
        if (!req.params.boardId || !req.cookies.userInfo.userId) return res.sendStatus(401)
        // Check if send data is valid

        const board = await Board.find({_id: req.params.boardId, users: req.cookies.userInfo.userId})

        // If there's already user with same username registered
        if (board.length == 0) return res.redirect('/')
        else next()
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

module.exports = {
    getBoard,
    getBoardsOfUser,
    addBoard,
    updateBoard,
    deleteBoard,
    checkAccess,
    addUserToBoard,
}