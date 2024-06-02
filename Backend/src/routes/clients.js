const express = require('express')
const { getClients, addClient, updateClient, deleteClient } = require('../controllers/clients.controller')
const clientsRouter = express.Router()

clientsRouter.get('/', getClients)
clientsRouter.post('/', addClient)
clientsRouter.patch('/:_id', updateClient)
clientsRouter.delete('/:_id', deleteClient)

module.exports = clientsRouter