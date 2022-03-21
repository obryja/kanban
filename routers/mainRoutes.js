const router = require('express').Router()
const services = require('../services/userServices')
const tokenServices = require('../services/tokenServices')

/********************* POST *********************/
/** req.body:
 * @username : username
 * @password : password */
 router.post("/login", services.authenticateUser, services.login)

 /** req.body:
  * @username : username
  * @password : password
  * @role : admin / user */
 router.post("/register", services.register, services.login)
 
 /** Data is retrieved from user's cookies 
  * @Deletes Refresh Token from database and user's cookies */
 router.post("/logout", tokenServices.deleteToken)

/********************* GET *********************/

router.get('/', (req, res) => {
    res.render('index', {title: 'Kanban'})
})

router.get('/user/:userId', (req, res) => {
    res.render('user', {title: 'User', userId: req.params.userId})
})

router.get('/board/:boardId', (req, res) => {
    res.render('board', {title: 'Board', boardId: req.params.boardId})
})

/*************** login & register ***************/
router.get("/login", async(req, res) => {
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/")

    res.render("login", {title: "Logowanie"})
})

router.get("/register", async(req, res) => {
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/")

    res.render("register", {title: "Rejestracja"})
})

module.exports = router