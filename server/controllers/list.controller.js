const WaifusModel = require('../models/list.model')
const { defaultError } = require('../middleware/status-sender')

module.exports.getWaifus = async (req, res) => {
  try {
    const waifus = await WaifusModel.paginate({}, req.body)

    res.json(waifus)
  } catch (error) {
    console.error(error)

    defaultError(res, 'list')
  }
}

module.exports.removeWaifuById = async (req, res) => {
  try {
    await WaifusModel.findByIdAndRemove(req.body.id)

    res.status(200).json({
      text: 'The post was successfully deleted',
      color: 'color--success'
    })
  } catch (e) {
    console.error(e)

    defaultError(res, 'list')
  }
}
