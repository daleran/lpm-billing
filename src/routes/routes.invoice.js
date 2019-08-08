const express = require('express')
const { invoiceController } = require('../controllers')

const router = express.Router()

router.post('/', invoiceController.generateInvoice)

module.exports = router
