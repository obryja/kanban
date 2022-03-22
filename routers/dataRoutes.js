const router = require('express').Router()
const userServices = require('../services/userServices')
const boardServices = require('../services/boardServices')

/******** returns user from cookies ********/
router.post('/get_user', userServices.getUser)

/**************** get board ****************
 * @id : id
 * ****************************************/
 router.post('/get_user_by_id', userServices.getUserById)

/**************** get board ****************
 * @id : "{{ boardId }}"
 * ****************************************/
 router.post('/get_board', boardServices.getBoard)

 /**************** add board ****************/
 router.post('/get_boards_of_user', boardServices.getBoardsOfUser)

 /******************************************
 * @username : username 
 * @id : "{{ boardId }}"
 *******************************************/
router.post("/add_user_to_board", boardServices.addUserToBoard)

/**************** add board ****************
 * @name : name of board
 * ****************************************/
router.post('/add_board', boardServices.addBoard)

/*************** Updating board ***************
 * @id : id of board to update
 * @name : name (optional)
 * @users : users (optional)
 * @toDo : to dd (optional)
 * @buffor : buffor (optional)
 * @working : working (optional)
 * @done : done (optional)
 * *********************************************/
 router.post('/update_board', boardServices.updateBoard)

/********** delete board by given @id **********/
router.post('/delete_board', boardServices.deleteBoard)

module.exports = router