const express = require('express')
const auth = require('../middleware/auth')
const asyncHandler = require('../middleware/async')

const ClientController = require('../controller/client')
const clientController = new ClientController();

const router = express.Router()

// User Routes 
router.get('/', asyncHandler(clientController.welcome))
router.post('/createAgent', asyncHandler(clientController.createAgent))
router.put('/updateClient', auth, asyncHandler(clientController.updateClient))
router.get('/getClient', auth, asyncHandler(clientController.getClient))


module.exports = router