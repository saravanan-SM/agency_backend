const jwt = require('jsonwebtoken')

const Client = require('../models/client')

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Client.findOne({ _id: decode._id,status:true })
        if (!user) {
            throw new Error('user invalid')
        }

        req.token = token
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send({ success: false, message: 'please authenticate' })

    }
}

module.exports = auth