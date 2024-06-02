const ClientSchema = require('../models/Client')

const getClients = async (req, res) => {
    const clients_list = await ClientSchema.find()
    
    res.json(
        clients_list
    )
}

const addClient = async (req, res) => {
    const {clientcode, name, profession, address} = req.body
    
    try {
        const existClientID = await ClientSchema.findOne({ clientcode })

        if(!clientcode) {
            return res.status(409).json({ message: "CLIENT CODE IS REQUIRED"})
        }

        if(existClientID){
            return res.status(409).json({ message: "CLIENT CODE ALREADY REGISTERED"})
        }

        const newClient = await ClientSchema.create({clientcode, name, profession, address})
        res.status(200).json(newClient)

    } catch (error) {
        
        res.json({
            message: 'Ha ocurrido un error al agregar el cliente',
            error
        })

    }
}

const updateClient = async (req, res) => {
    const { _id } = req.params
    const { clientcode, name, profession, address } = req.body
    
    try {

        if(!clientcode) {
            return res.status(409).json({ message: "CLIENT CODE IS REQUIRED"})
        }

        const updatedClient = await ClientSchema.findOneAndUpdate({_id}, {
            $set: {clientcode, name, profession, address}
        }, {new: true})

        res.status(200).json( updatedClient )

    } catch (error) {
        
        res.json({
            message: 'Ha ocurrido un error al actualizar el cliente',
            error: error
        })

    }
}

const deleteClient = async (req, res) => {
    const { _id } = req.params
    
    try {
        
        const client = await ClientSchema.findOne({_id})

        if (!client) throw new Error

        await ClientSchema.findOneAndDelete({_id});
        res.status(200).json({status: 'Se ha eliminado el cliente correctamente'});
    
    } catch (error) {
    
        res.json({
            message: 'Ha ocurrido un error al eliminar el cliente',
        })    
    }
}

module.exports = {
    getClients,
    addClient,
    updateClient,
    deleteClient
}