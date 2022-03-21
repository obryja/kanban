const router = require('express').Router()
const userServices = require('../services/userServices')

/******** returns user from cookies ********/
router.post('/get_user', userServices.getUser)

module.exports = router