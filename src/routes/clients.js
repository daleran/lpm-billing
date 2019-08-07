const express = require('express')
const { clients } = require('../controllers')

const router = express.Router()

router.post('/', clients.postClient)

module.exports = router
