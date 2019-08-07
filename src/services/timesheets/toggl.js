const request = require('request')

// Create a client in Toggle
const createClient = async (name) => {

}

// Update the client's name in Toggl
const updateClient = async (name) => {

}

// Get all the time entries that are not marked as invoiced
const getUninvoicedEntries = async (clientId) => {

}

// Tag all uninvoiced entries as invoiced
const invoiceEntries = async (clientId) => {

}

// Tag all invoiced entries but not billed entries as billed
const billEntries = async (clientId) => {

}

module.exports = {
  createClient,
  updateClient,
  getUninvoicedEntries,
  invoiceEntries,
  billEntries
}
