// Create a client in the connected timesheet system
const createClient = require('./' + process.env.TIMESHEETS).createClient

// Update the client's name in the connected timesheet system
const updateClient = require('./' + process.env.TIMESHEETS).updateClient

// Delete a client in the connected timesheet system
const deleteClient = require('./' + process.env.TIMESHEETS).deleteClient

// Get all the time entries from a client in a date range
const getEntries = require('./' + process.env.TIMESHEETS).getEntries

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  getEntries
}
