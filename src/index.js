// Services requiring set up
const services = require('./services')
const dbService = services.db

// Express framework setup
const express = require('express')
const server = express()
const port = process.env.PORT || 3000

// Express middleware dependencies
const rateLimit = require('express-rate-limit')
const { auth } = require('./middleware')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./docs/swagger.json')

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
  // A logging middleware for logging all http requests
  server.use(morgan('combined'))

  // A rate limiter that will limit the requests per minute from an ip to avoid DDoS attacks
  const limiter = rateLimit({ windowMs: 60000, max: process.env.RATE_LIMIT })
  server.use(limiter)

  // A security middleware that automatically sets certain header to avoid known exploites
  server.use(helmet())

  // Automatically parse JSON coming and and out of the API into JS objects
  server.use(express.json())

  // Add the resource routes with the authorization middleware
  server.use('/clients', auth, clientRoutes)
  server.use('/invoices', auth, invoiceRoutes)

  // Add the API documentation endpoint to the root
  server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

  // A catch all for any request that do not match any of the routes above
  server.all('*', (req, res) => res.status(404).send('404 Not Found'))
}

// Export the server variable and the setup function
module.exports = {
  setup,
  server
}
