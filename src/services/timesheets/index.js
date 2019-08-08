// Create a client in the connected timesheet system
const createClient = require('./' + process.env.TIMESHEETS).createClient

// Update the client's name in the connected timesheet system
const updateClient = require('./' + process.env.TIMESHEETS).updateClient


module.exports = {
  createClient,
  updateClient
}
