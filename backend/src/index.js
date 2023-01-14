const express = require('express')
const app = express()
const cors = require('cors') 
const chalk = require('chalk')
const bodyParser = require('body-parser')

require('dotenv').config()

const UserRoute =  require('./Routes/User')
const AdminRoute = require('./Routes/Admin')

app.use(cors())
app.use(bodyParser.json())
app.use('/',UserRoute)
app.use('/admin',AdminRoute)

require('../db/config')

const PORT = '3001'

app.use(express.json())
app.use('/uploads',express.static('uploads'))

const jwtkey = process.env.JWT_KEY

app.listen(PORT,()=>
    console.log(chalk.magenta(`\nServer started on port :`),chalk.yellow( PORT))
)
    
    
    
    
    
    
    
    
    
    
    
    