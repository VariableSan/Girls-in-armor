module.exports.defaultError = (res, route) => {
  res.status(500).json({
    text: `Something went wrong in ${route} route`,
    color: 'color--error'
  })
}
