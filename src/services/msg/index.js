// Interface for sending and invoice to a client via a messaging system

// Send an invoice to a client
const send = require('./' + process.env.MSG).send

// Export the interface
module.exports = {
  send
}
