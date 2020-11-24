/* ==================== LIBRARIES, MIDDLEWARES START==================== */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const { startMongo } = require('./middleware/mongoose.middle')
const passportStrategy = require('./middleware/passport-strategy')
/* ==================== LIBRARIES, MIDDLEWARES END==================== */

/* ==================== ROUTES EXPORTS START==================== */
const listRoute = require('./routes/list.route')
const addRoute = require('./routes/add.route')
const waifuRoute = require('./routes/waifu.route')
const authRoute = require('./routes/auth.route')
const moderateRoute = require('./routes/moderate.route')
/* ==================== ROUTES EXPORTS END==================== */

/* ==================== MONGO SERVER START==================== */
startMongo()
/* ==================== MONGO SERVER END==================== */

/* ==================== EXPRESS CONFIGS START==================== */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
passport.use(passportStrategy)
/* ==================== EXPRESS CONFIGS END==================== */

/* ==================== ROUTES START==================== */
app.use('/list', listRoute)
app.use('/add', addRoute)
app.use('/waifu', waifuRoute)
app.use('/auth', authRoute)
app.use('/moderate', moderateRoute)
/* ==================== ROUTES END==================== */

module.exports = {
  path: '/api',
  handler: app
}
