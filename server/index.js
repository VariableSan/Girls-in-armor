const express = require('express')
const app = express()

/*==================== models import START====================*/
const homeModel = require('../models/homeModel')
/*==================== models import END====================*/

app.get('/', (req, res) => {
  res.json()
})

module.exports = {
  path: '/api',
  handler: app
}
