const ModerateWaifusModel = require('../models/moderate.model')

module.exports.addWaifu = async (req, res) => {
  try {
    const waifus = new ModerateWaifusModel(req.body)

    await waifus.save()
    res.status(200).json({
      text: 'Your request has been accepted, the post is being moderated',
      color: 'color--success'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in add route',
      color: 'color--error'
    })
  }
}
