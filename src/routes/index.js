// Map the route files to variables
const clientRoutes = require('./routes.client')
const invoiceRoutes = require('./routes.invoice')

// Export the routes
module.exports = {
  clientRoutes,
  invoiceRoutes
}
