// Get required services and modesl
const { db, timesheets, msg, invoiceCalculator } = require('../services')
const { invoiceModel } = require('../models')

// A tool for parsing MongoDB id keys
const MongoId = require('mongodb').ObjectID

// Generate a new invoice from the timesheet service and add it to the database
const generateInvoice = async (req, res, next) => {
  let invoice = req.body
  try {
    // Validate the generation request body against the model
    const valid = invoiceModel.validateGenerateInvoiceIn(invoice)
    if (!valid) {
      // If the request is invalid return 400 with the errors
      res.status(400).send(invoiceModel.validateGenerateInvoiceIn.errors)
    } else {
      // Get the time sheet entries from the date range from the time sheet servivce
      const timesheetEntries = await timesheets.getEntries(invoice)

      // Add the lineItems to the invoice
      invoice.lineItems = timesheetEntries

      // Get the client record from the database
      const client = await db.getRecord('clients', invoice.clientId)

      // Calculate the invoice charges using the clinet billedRate
      invoice = invoiceCalculator.calculateInvoice(invoice, client.billedRate)

      // Set the amount paid to 0 since this is a new invoice
      invoice.amountPaid = 0

      // Set the created on date time stamp
      invoice.createdOn = new Date().toISOString()

      // Set the updated date time stamp
      invoice.updatedOn = new Date().toISOString()

      // Add the invoice to the database
      const dbInvoice = await db.addRecord('invoices', invoice)

      // Send a 201 with the completed invoice
      res.status(201).send(dbInvoice)
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

const updateInvoice = async (req, res, next) => {
  let invoice = req.body
  try {
    // Validate the update invoice against the model
    const valid = invoiceModel.validateUpdateInvoiceIn(invoice)
    if (!valid) {
      // If the request is invalid return 400 with the errors
      res.status(400).send(invoiceModel.validateUpdateInvoiceIn.errors)
    } else {
      // Get a new set of time sheet entries from the updated date range
      const timesheetEntries = await timesheets.getEntries(invoice)

      // Replace the lineItems with the updated entries
      invoice.lineItems = timesheetEntries

      // Get the client from the db
      const client = await db.getRecord('clients', invoice.clientId)

      // Calculate the invoice charges using the clinet billedRate
      invoice = invoiceCalculator.calculateInvoice(invoice, client.billedRate)

      // Replace the updated time stamp with a new one
      invoice.updatedOn = new Date().toISOString()

      // Parse the id to a MongoDB ID
      invoice._id = new MongoId(invoice._id)

      // Replace the invocie in the database with the updated one
      const dbInvoice = await db.updateRecord('invoices', invoice)

      // Return a 200 with the updated invoice
      res.status(200).send(dbInvoice)
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

// Get an invoice by id
const getInvoice = async (req, res, next) => {
  try {
    // Parse the id string into a MongoDB ID
    const id = new MongoId(req.params.id)

    // Get the record using the id
    const invoice = await db.getRecord('invoices', id)

    if (!invoice) {
      // If the record is not found return a 404
      res.status(404).send(`404: Invoice ${id} not found`)
    } else {
      // Otherwise return a 200 with the invoice
      res.status(200).send(invoice)
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

// Get an array of invoices that match the optional query string
const getInvoices = async (req, res, next) => {
  try {
    // If there is a query string with an _id key, parse it into a MongoDB id
    if (req.query._id) {
      req.query._id = new MongoId(req.query._id)
    }
    // Get the record form the db
    const result = await db.getRecords('invoices', req.query)

    // Return a 200 with the record
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

// Delete a single invoice by id
const deleteInvoice = async (req, res, next) => {
  try {
    // Parse the if into a MongoDB ID
    const id = new MongoId(req.params.id)

    // Delete the record in the db
    await db.deleteRecord('invoices', id)

    // Return a 200 for a succesful deletion
    res.status(200).send('200: Record Deleted')
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    // If there is an error return it and send the error middleware
    res.status(status).send(error.message) && next(error)
  }
}

// Send the invoice using the messaging service
const sendInvoice = async (req, res, next) => {
  try {
    // Parse the id into a MongoDB ID
    const id = new MongoId(req.params.id)

    // Get the invoice by ID from the database
    const invoice = await db.getRecord('invoices', id)

    if (!invoice) {
      // If the record is not found return a 404
      res.status(404).send(`404: Invoice ${id} not found`)
    } else {
      // Otherwise ge the client by ID from the database
      const client = await db.getRecord('clients', invoice.clientId)

      // Send the invoice to the client using the messagin service
      await msg.send(client, invoice)

      // Return a 200 with a confirmation
      res.status(200).send('200: Sent')
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
  generateInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  sendInvoice
}
