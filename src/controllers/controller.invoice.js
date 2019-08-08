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

const updateInvoice = async (req, res, next) => {
  let invoice = req.body
  try {
    const valid = invoiceModel.validateUpdateInvoiceIn(invoice)
    if (!valid) {
      res.status(400).send(invoiceModel.validateUpdateInvoiceIn.errors)
    } else {
      const timesheetEntries = await timesheets.getEntries(invoice)
      invoice.lineItems = timesheetEntries
      const client = await db.getRecord('clients', invoice.clientId)
      invoice = invoiceCalculator.calculateInvoice(invoice, client.billedRate)
      invoice.updatedOn = new Date().toISOString()
      invoice._id = new MongoId(invoice._id)
      const dbInvoice = await db.updateRecord('invoices', invoice)
      res.status(200).send(dbInvoice)
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
    const id = new MongoId(req.params.id)
    const invoice = await db.getRecord('invoices', id)
    if (!invoice) {
      res.status(404).send(`404: Invoice ${id} not found`)
    } else {
      res.status(200).send(invoice)
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
    if (req.query._id) {
      req.query._id = new MongoId(req.query._id)
    }
    const result = await db.getRecords('invoices', req.query)
    res.status(200).send(result)
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
    const id = new MongoId(req.params.id)
    await db.deleteRecord('invoices', id)
    res.status(200).send('200: Record Deleted')
  } catch (error) {
    let status = 500
    if (error.statusCode === 400) {
      status = 400
    }
    res.status(status).send(error.message) && next(error)
  }
}

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
  getInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  sendInvoice
}
