const request = require('request-promise-native')

const clientsUrl = 'https://www.toggl.com/api/v8/clients'
const entiresUrl = 'https://www.toggl.com/api/v8/time_entries'

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

// Delete a client in Toggl
const deleteClient = (clientId) => {

}

// PRIVATE
// Get an array of projects assocaited with the clientId
const getProjects = (invoiceHeader) => {
  const getClientProjects = {
    method: 'GET',
    uri: clientsUrl + '/' + invoiceHeader.clientId + '/projects',
    auth: {
      user: process.env.TOGGL_API_KEY,
      pass: 'api_token'
    },
    json: true
  }
  return new Promise((resolve, reject) => {
    request(getClientProjects)
      .then((body) => {
        resolve(body)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// PRIVATE
// Transform the entries from the Toggl format to the invoice format
const transformEntries = (entries, projects) => {

}

// Get all the time entries from a client in a date range
const getEntries = (invoiceHeader) => {
  const getClientEntries = {
    method: 'GET',
    uri: entiresUrl,
    auth: {
      user: process.env.TOGGL_API_KEY,
      pass: 'api_token'
    },
    qs: {
      start_date: invoiceHeader.billingCycleStart,
      end_date: invoiceHeader.billingCycleEnd
    },
    json: true
  }
  return new Promise((resolve, reject) => {
    request(getClientEntries)
      .then((body) => {
        resolve(body)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Interface
module.exports = {
  createClient,
  updateClient,
  deleteClient,
  getEntries
}
