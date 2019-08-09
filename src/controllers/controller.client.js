// Get the relavent services and models
const { db, timesheets } = require('../services')
const { clientModel } = require('../models')

// Post a new client to the database and the time sheet service
const postClient = async (req, res, next) => {
  try {
    // Validate the incoming data against the model
    const valid = clientModel.validatePostClientIn(req.body)

    // If the model in invalid respond with a 400 and the validation errors
    if (!valid) {
      res.status(400).send(clientModel.validatePostClientIn.errors)
    } else {
      // Add the client to the timesheet service
      const timesheetClient = await timesheets.createClient(req.body)

      // Add the clietn tot the database
      const dbClient = await db.addRecord('clients', timesheetClient)

      // Respond with the database record and a 201
      res.status(201).send(dbClient)
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Search the clients according to a query string
const getClients = async (req, res, next) => {
  try {
    // Get all the records that match the request query string
    const result = await db.getRecords('clients', req.query)

    // Send the array of clients with a 200
    res.status(200).send(result)
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Get a single client by ID
const getClient = async (req, res, next) => {
  try {
    // Parse the ID from the url parameter
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      // If the id is not a number, return a 400 with an error
      res.status(400).send('400: id is not a number')
    } else {
      // Get the client from the db by id
      const result = await db.getRecord('clients', id)

      // If the client is not found in the db return a 404
      if (!result) {
        res.status(404).send('404: Record not found')
      } else {
        // Otherwise return the client with a 200
        res.status(200).send(result)
      }
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Update a client in the time sheet service and the db by replacing the recors with a supplied one
const updateClient = async (req, res, next) => {
  try {
    // Validate the client against the model
    const valid = clientModel.validateUpdateClientIn(req.body)
    if (!valid) {
      // If the model in invalid respond with a 400 and the validation errors
      res.status(400).send(clientModel.validateUpdateClientIn.errors)
    } else {
      // Update the client in the time sheet service
      const timesheetClient = await timesheets.updateClient(req.body)

      // Find and replace the client in the database
      const dbClient = await db.updateRecord('clients', timesheetClient)

      // Send the updated client back with a 200
      res.status(200).send(dbClient)
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Delete a client in the timesheet service and the db by id
const deleteClient = async (req, res, next) => {
  try {
    // Parse the ID from the url parameter
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      // If the id is not a number, return a 400 with an error
      res.status(400).send('400: id is not a number')
    } else {
      // Delete the record in the database first
      await db.deleteRecord('clients', id)

      // Then delete the record in the time sheet service
      await timesheets.deleteClient(id)

      // Return a 200
      res.status(200).send('200: Record Deleted')
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Expose the controller functions
module.exports = {
  postClient,
  getClients,
  getClient,
  updateClient,
  deleteClient
}
