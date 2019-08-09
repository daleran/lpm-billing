// Get the controllers for clients and invoices
const clientController = require('./controller.client')
const invoiceController = require('./controller.invoice')

// Expose the controllers
module.exports = {
  clientController,
  invoiceController
}
