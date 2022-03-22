const RefreshToken = require('../db/schemas').RefreshToken
const jwt = require("jsonwebtoken")

/********************** generate token **********************/
generateAccessToken = (user) => {
    // set expiration date and user object
    return jwt.sign({
        exp: Math.floor(Date.now()/1000) + 3600, // 60 min expiration
        data: user}, 
        process.env.ACCESS_TOKEN_SECRET)
}

/***************** check if token is valid *****************/
authenticateToken = (req, res, next) => {
    const token =  req.headers["authorization"] 

    if(token == null) return res.status(401).send()
    // if TOKEN will be good it will go to next middleware
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            console.log("Refreshing token due to: " + err.name);
            // if Access Token expires refresh it and return a new one to user
            return refreshAccessToken(req, res)
        }
        // retrieved user for later use in next middleware
        req.user = user.data
        next() 
    })
}

/************* send new token when old expires *************/
refreshAccessToken = async (req, res) => {
    try {
        usersRefreshToken = req.cookies.refreshToken

        // Check if Refresh Token was send and saved in database
        if(! await checkRefreshToken(usersRefreshToken))
            return res.sendStatus(401)

        // Check if Refresh Token is valid
        jwt.verify(usersRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err)     return res.status(403).send()

            // return new Access Token
            res.status(217).json(generateAccessToken(user))
        })
    } catch(err) {
        res.status(500).send()
        console.log(err)
    }
}
/* checks if refresh token is valid . Used to determine if user is logged or not */
checkRefreshToken = async refreshToken => {
    try {
        if(!refreshToken)  return false

        // Check if Refresh Token exists in database
        if(!await RefreshToken.exists({token: refreshToken}))
            return false

        return true
    } catch(err) {
        console.log(err)
        return false
    }
}

/***** check if user is logged and redirects them if not *****/
checkLogged = async (req, res, next) => {
    if(! await checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/login")

    next()
}

/* Deletes user's Refresh token from database and their cookies */
deleteToken = async (req, res) => {
    try {
        // Deletes user's cookies
        res.cookie("refreshToken", "", {
            httpOnly: true,
            maxAge: -1
        })

        res.cookie("userInfo", "", {
            httpOnly: true,
            maxAge: -1
        })

        // Delete Refresh Token from database
        RefreshToken.deleteOne({token: req.cookies.refreshToken}, err => {
            if(err) return res.sendStatus(403)
        })
       
        res.sendStatus(202)
    } catch(err) {
        res.status(500).send()
        console.log(err)
    }
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    checkRefreshToken,
    checkLogged,
    deleteToken
}