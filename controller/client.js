const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Agent = require('../models/agent')
const Client = require('../models/client')


require('../config/db')


class UserController {
    constructor() {

    }

    async welcome(req, res) {
        try {
            res.status(200).send({ status: 200, success: true, message: "Welcome To Agency App" })
        } catch (error) {
            console.log("error @ welcome: ", error)
            res.status(200).send({ status: 500, success: false, message: "Failed" })
        }
    }

    async createAgent(req, res) {
        try{
            const {agentName, address1, address2, city, agencyPhNumber, clientName, email, password, phoneNumber, totalBill} = req.body;
            let agent;
            let client;
            if(agentName && clientName){
                agent = await new Agent({ agentName, address1, address2, city, agencyPhNumber }).save()
                client = await new Client({ clientName, email, password, phoneNumber, totalBill, agencyId: agent._id }).save()
            }
            let token = await client.generateAuthToken()
            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ status: 201, success: true, message: 'Successfully Created' })
        } catch (error){
            console.log("error @ createAgent: ", error)
            res.status(200).send({ status: 500, success: false, message: "Creation Failed" })
        }
        
    }
    
    async updateClient(req, res) {
        try {  
            const client = await Client.findOne({ _id: req.user._id });
            const updates = Object.keys(req.body)
            updates.forEach((update) => client[update] = req.body[update])
            await client.save()
            res.status(200).send({ status: 201, success: true, message: "Successfully Updated Details" })
        } catch (error) {
            console.log("error @ updateClient: ", error)
            res.status(200).send({ status: 500, success: false, message: "Client Detail Updated Failed" })
        }
    }

    async getClient(req, res) {
        try {
            const client = await Client.findOne({ _id: req.user._id }).populate('agencyId', 'agentName').select('clientName totalBill');
            res.status(200).send({ status: 201, success: true, data: client, message: "Client Detail Fetched Successfully" })
        } catch (error) {
            console.log("error @ getClient: ", error)
            res.status(200).send({ status: 500, success: false, message: "Client Detail Fetched Failed" })
        }
    }

}

module.exports = UserController