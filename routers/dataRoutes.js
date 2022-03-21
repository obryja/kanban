const router = require('express').Router()
const userServices = require('../services/userServices')
const boardServices = require('../services/boardServices')

/******** returns user from cookies ********/
router.post('/get_user', userServices.getUser)

/**************** add board ****************
 * @name : name of board
 * ****************************************/
router.post('/add_board', boardServices.addBoard)

/**************** add board ****************/
 router.post('/get_boards_of_user', boardServices.getBoardsOfUser)

module.exports = router