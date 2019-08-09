// Get the various service indexes
const auth = require('./auth')
const db = require('./db')
const msg = require('./msg')
const timesheets = require('./timesheets')
const invoiceCalculator = require('./invoiceCalculator')

// Export the services interface
module.exports = {
  auth,
  db,
  msg,
  timesheets,
  invoiceCalculator
}
