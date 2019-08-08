const { db, timesheets } = require('../services')
const { clientModel } = require('../models')

const postClient = async (req, res, next) => {
  try {
    const valid = clientModel.validatePostClientIn(req.body)
    if (!valid) {
      res.status(400).send(clientModel.validatePostClientIn.errors)
    } else {
      const timesheetClient = await timesheets.createClient(req.body)
      const dbClient = await db.addRecord('clients', timesheetClient)
      res.status(201).send(dbClient)
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const getClients = async (req, res, next) => {
  try {
    const result = await db.getRecords('clients', req.query)
    res.status(200).send(result)
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const getClient = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send('400: id is not a number')
    } else {
      const result = await db.getRecord('clients', id)

      if (!result) {
        res.status(404).send('404: Record not found')
      } else {
        res.status(200).send(result)
      }
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const updateClient = async (req, res, next) => {
  try {
    const valid = clientModel.validateUpdateClientIn(req.body)
    if (!valid) {
      res.status(400).send(clientModel.validateUpdateClientIn.errors)
    } else {
      const timesheetClient = await timesheets.updateClient(req.body)
      const dbClient = await db.updateRecord('clients', timesheetClient)
      res.status(200).send(dbClient)
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const deleteClient = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send('400: id is not a number')
    } else {
      await db.deleteRecord('clients', id)
      await timesheets.deleteClient(id)
      res.status(200).send('200: Record Deleted')
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

module.exports = {
  postClient,
  getClients,
  getClient,
  updateClient,
  deleteClient
}
