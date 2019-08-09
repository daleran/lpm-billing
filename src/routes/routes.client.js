const express = require('express')
const { clientController } = require('../controllers')

// Create a new router for clients
const router = express.Router()

// Route the url enpoints to controller functions
router.post('/', clientController.postClient)
router.get('/:id', clientController.getClient)
router.get('/', clientController.getClients)
router.put('/', clientController.updateClient)
router.delete('/:id', clientController.deleteClient)

// Export the router
module.exports = router
