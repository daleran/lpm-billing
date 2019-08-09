const express = require('express')
const { invoiceController } = require('../controllers')

// Create a new router for invoices
const router = express.Router()

// Map the endpoints to invoice controllers
router.post('/generate', invoiceController.generateInvoice)
router.post('/:id/send', invoiceController.sendInvoice)
router.get('/:id', invoiceController.getInvoice)
router.get('/', invoiceController.getInvoices)
router.put('/', invoiceController.updateInvoice)
router.delete('/:id', invoiceController.deleteInvoice)

// Expor the router
module.exports = router
