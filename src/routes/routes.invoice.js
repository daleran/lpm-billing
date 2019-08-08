const express = require('express')
const { invoiceController } = require('../controllers')

const router = express.Router()

router.post('/generate', invoiceController.generateInvoice)
router.post('/:id/send', invoiceController.sendInvoice)

module.exports = router
