const request = require('request-promise-native')

const clientsUrl = 'https://www.toggl.com/api/v8/clients'
const entiresUrl = 'https://www.toggl.com/api/v8/time_entries'

// Create a client in Toggle
const createClient = (client) => {
  const createClient = {
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
    request(createClient)
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
  const updateClient = {
    method: 'PUT',
    uri: clientsUrl + '/' + client._id,
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
    request(updateClient)
      .then((body) => {
        resolve(client)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Delete a client in Toggl
const deleteClient = (clientId) => {
  const deleteClient = {
    method: 'DELETE',
    uri: clientsUrl + '/' + clientId,
    auth: {
      user: process.env.TOGGL_API_KEY,
      pass: 'api_token'
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    request(deleteClient)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// PRIVATE
// Get an array of projects assocaited with the clientId
const getProjects = (invoice) => {
  const getClientProjects = {
    method: 'GET',
    uri: clientsUrl + '/' + invoice.clientId + '/projects',
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
// Extract the project name from an array of projects using a projectId
const extractProjectName = (projectId, projects) => {
  let found
  projects.forEach(project => {
    if (project.id === projectId) {
      found = project.name
    }
  })
  if (found) {
    return found
  } else {
    return 'No Project'
  }
}

// PRIVATE
// Transform the entries from the Toggl format to the invoice format
const transformEntries = (entries, projects) => {
  const transformed = []
  for (let i = 0; i < entries.length; i++) {
    transformed[i] = {
      id: entries[i].id,
      description: extractProjectName(entries[i].pid, projects) + ': ' + entries[i].description,
      start: entries[i].start,
      stop: entries[i].stop,
      duration: entries[i].duration
    }
  }
  return transformed
}

// Get all the time entries from a client in a date range
const getEntries = (invoice) => {
  const getClientEntries = {
    method: 'GET',
    uri: entiresUrl,
    auth: {
      user: process.env.TOGGL_API_KEY,
      pass: 'api_token'
    },
    qs: {
      start_date: invoice.billingCycleStart,
      end_date: invoice.billingCycleEnd
    },
    json: true
  }
  return new Promise((resolve, reject) => {
    let projects = []
    getProjects(invoice)
      .then((projs) => {
        projects = projs
        return request(getClientEntries)
      })
      .then((rawEntries) => {
        resolve(transformEntries(rawEntries, projects))
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
