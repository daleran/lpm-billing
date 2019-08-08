// Services requiring set up
const services = require('./services')
const dbService = services.db

// Express framework setup
const express = require('express')
const server = express()
const port = process.env.PORT || 3000

// Express middleware dependencies
const helmet = require('helmet')
const morgan = require('morgan')

// Routes
const { clientRoutes, invoiceRoutes } = require('./routes')

const setup = async () => {
  try {
    // Connect to the database
    await dbService.connect()
    // Configure express after the database connection occurs
    configureExpress()
    // Listen on the port specified in the enviromental files
    server.listen(port, () => {
      console.log(`Serving LPM Billing API on port: ${port}`)
      server.emit('server_started')
    })
  } catch (error) {
    console.log(error)
  }
}

const configureExpress = () => {
  // A security middleware that automatically sets certain header to avoid known exploites
  server.use(helmet())

  // Automatically parse JSON coming and and out of the API into JS objects
  server.use(express.json())

  // A logging middleware for logging all http requests
  server.use(morgan('combined'))

  // Add the resource routes
  server.use('/clients', clientRoutes)
  server.use('/invoices', invoiceRoutes)

  // A catch all for any request that do not match any of the routes above
  server.all('*', (req, res) => res.status(404).send('404 Not Found'))
}

module.exports = {
  setup,
  server
}
