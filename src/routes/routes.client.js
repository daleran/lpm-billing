const express = require('express')
const { clientController } = require('../controllers')

const router = express.Router()

router.post('/', clientController.postClient)
router.get('/:id', clientController.getClient)
router.get('/', clientController.getClients)
router.put('/', clientController.updateClient)
router.delete('/:id', clientController.deleteClient)

module.exports = router
