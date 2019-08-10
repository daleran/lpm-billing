// Interface for sending and invoice to a client via a messaging system
// The file to pull the function from depends on an enviromental variable

// Send an invoice to a client
const send = require('./' + process.env.MSG).send

// Export the interface
module.exports = {
  send
}
