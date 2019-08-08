const { db, timesheets, msg, invoiceCalculator } = require('../services')
const { invoiceModel } = require('../models')
const MongoId = require('mongodb').ObjectID

const generateInvoice = async (req, res, next) => {
  let invoice = req.body
  try {
    const valid = invoiceModel.validateGenerateInvoiceIn(invoice)
    if (!valid) {
      res.status(400).send(invoiceModel.validateGenerateInvoiceIn.errors)
    } else {
      const timesheetEntries = await timesheets.getEntries(invoice)
      invoice.lineItems = timesheetEntries
      const client = await db.getRecord('clients', invoice.clientId)
      invoice = invoiceCalculator.calculateInvoice(invoice, client.billedRate)
      invoice.amountPaid = 0
      invoice.createdOn = new Date().toISOString()
      invoice.updatedOn = new Date().toISOString()
      const dbInvoice = await db.addRecord('invoices', invoice)
      res.status(201).send(dbInvoice)
    }
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

/*
const updateInvoice = async (req, res, next) => {
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
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const getInvoice = async (req, res, next) => {
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
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const getInvoices = async (req, res, next) => {
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
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

const deleteInvoice = async (req, res, next) => {
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
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}
*/
const sendInvoice = async (req, res, next) => {
  try {
    const id = new MongoId(req.params.id)
    const invoice = await db.getRecord('invoices', id)
    if (!invoice) {
      res.status(404).send(`404: Invoice ${id} not found`)
    } else {
      const client = await db.getRecord('clients', invoice.clientId)
      await msg.send(client, invoice)
      res.status(200).send('200: Sent')
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
  generateInvoice,
  sendInvoice
}
