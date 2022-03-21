const async = require('hbs/lib/async')
const Board = require('../db/schemas').Board

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

module.exports = {
    addBoard,
    getBoardsOfUser,
}