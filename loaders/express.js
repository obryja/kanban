require('./mongoose')
require('dotenv').config()
const express = require('express')
const hbs = require("hbs")
const bp = require('body-parser')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000
const app = express()

/*************** hbs settings ***************/

hbs.registerPartials('views/partials')
app.set('view engine', 'hbs')
app.use(express.static("public"))

/*************** bp settings ***************/

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/* middleware for reading cookies from req */

app.use(cookieParser())

app.listen(port)

module.exports = app