const { db, timesheets } = require('../services')
const { clientModel } = require('../models')

const postClient = async (req, res, next) => {
  try {
    const valid = clientModel.validateClientNoId(req.body)
    if (!valid) {
      res.status(400).send(clientModel.validateClientNoId.errors)
    } else {
      const timesheetClient = await timesheets.createClient(req.body)
      const dbClient = await db.addRecord('clients', timesheetClient)
      res.status(201).send(dbClient)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message) && next(error)
  }
}

module.exports = {
  postClient
}
