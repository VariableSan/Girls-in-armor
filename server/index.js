const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { startMongo } = require('./middleware/mongoose.middle')

/*==================== ROUTES EXPORTS START====================*/
const listRoute = require('./routes/list.route')
const addRoute = require('./routes/add.route')
const waifuRoute = require('./routes/waifu.route')
/*==================== ROUTES EXPORTS END====================*/

/*==================== MONGO SERVER START====================*/
startMongo()
/*==================== MONGO SERVER END====================*/

/*==================== EXPRESS CONFIGS START====================*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
/*==================== EXPRESS CONFIGS END====================*/

/*==================== ROUTES START====================*/
app.use('/list', listRoute)
app.use('/add', addRoute)
app.use('/waifu', waifuRoute)
/*==================== ROUTES END====================*/

module.exports = {
	path: '/api',
	handler: app
}
