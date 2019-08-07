const express = require('express')
const { clientController } = require('../controllers')

const router = express.Router()

router.post('/', clientController.postClient)

module.exports = router
