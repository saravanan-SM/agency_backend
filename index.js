require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')

const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')

// DB Config
require('./config/db')

// User Routes
const userRouter = require('./router/user')


const app = express()
app.use(express.json())

const port = process.env.PORT || 4000

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:4000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(userRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log('server is up on the port' + port)  
})