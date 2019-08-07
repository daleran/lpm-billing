const request = require('request-promise-native')

const clientsUrl = 'https://www.toggl.com/api/v8/clients'
// const entiresUrl = 'https://www.toggl.com/api/v8/time_entries'
// const projectsUrl = 'https://www.toggl.com/api/v8/projects/'

// Create a client in Toggle
const createClient = (client) => {
  const options = {
    method: 'POST',
    uri: clientsUrl,
    auth: {
      user: process.env.TOGGL_API_KEY,
      pass: 'api_token'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      client: {
        name: client.name,
        wid: process.env.TOGGL_WS_ID
      }
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options)
      .then((body) => {
        client._id = body.data.id
        resolve(client)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Update the client's name in Toggl
const updateClient = (client) => {

}

// Get all the time entries that are not marked as invoiced
const getUninvoicedEntries = (clientId) => {

}

// Tag all uninvoiced entries as invoiced
const invoiceEntries = (clientId) => {

}

// Tag all invoiced entries but not billed entries as billed
const billEntries = (clientId) => {

}

module.exports = {
  createClient,
  updateClient,
  getUninvoicedEntries,
  invoiceEntries,
  billEntries
}
