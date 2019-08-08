const express = require('express')
const { invoiceController } = require('../controllers')

const router = express.Router()

router.post('/generate', invoiceController.generateInvoice)
router.post('/:id/send', invoiceController.sendInvoice)
router.get('/:id', invoiceController.getInvoice)
router.get('/', invoiceController.getInvoices)
router.put('/', invoiceController.updateInvoice)
router.delete('/:id', invoiceController.deleteInvoice)

module.exports = router
