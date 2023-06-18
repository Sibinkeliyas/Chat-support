const express = require('express')
const { login, findUsers } = require('../controller')
const { addMessage, findMessage } = require('../controller/message')
const route = express()
const protect = require('../middleware/protect')

route.route('/login').post(login)

route.route('/add-message').post(protect('admin') ,addMessage)

route.route('/find-message').post(protect('user') ,findMessage)

route.route('/find-users').post(protect('admin') ,findUsers)

module.exports = route