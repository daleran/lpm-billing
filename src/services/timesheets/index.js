// Create a client in the connected timesheet system
const createClient = require('./' + process.env.TIMESHEETS).createClient

// Update the client's name in the connected timesheet system
const updateClient = require('./' + process.env.TIMESHEETS).updateClient

// Get all the time entries that are not marked as invoiced
const getUninvoicedEntries = require('./' + process.env.TIMESHEETS).getUninvoicedEntries

// Tag all uninvoiced entries as invoiced
const invoiceEntries = require('./' + process.env.TIMESHEETS).invoiceEntries

// Tag all invoiced entries but not billed entries as billed
const billEntries = require('./' + process.env.TIMESHEETS).billEntries

module.exports = {
  createClient,
  updateClient,
  getUninvoicedEntries,
  invoiceEntries,
  billEntries
}
