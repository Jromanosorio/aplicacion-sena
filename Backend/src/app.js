require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./connection/connection');
const clientsRouter = require('./routes/clients');
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

ConnectDB()
.then(console.log('Se ha conectado a la base de datos'))
.catch(error => console.log('Ha ocurrido un error al conectar a la base de datos', error))

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.use('/api/clients', clientsRouter)

app.listen(PORT, () => {
    console.log('Conectado al Servidor en el puerto: ', PORT)
})