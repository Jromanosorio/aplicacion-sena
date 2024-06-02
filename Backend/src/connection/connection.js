require('dotenv').config();
const Mongoose = require('mongoose')

async function ConnectDB() {
    const DB_URL = process.env.DB_CLUSTER
    await Mongoose.connect(DB_URL)
}

module.exports = ConnectDB