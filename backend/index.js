const express = require('express')
const cors = require('cors') 
const chalk = require('chalk')
const validator = require('validator')
const date = require('date-and-time');
const Jwt = require('jsonwebtoken')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()

const adminRouter = require('./admin')

require('./db/config')
const User = require('./db/User');
const app = express()

const port = '3001'
app.listen(port,()=>console.log(chalk.magenta(`\nServer started on port :`),chalk.yellow( port)))


app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))

const jwtkey = 'user-management'

function time() {
    const now = new Date();
    console.log('\n',date.format(now, 'hh:mm:ss A'));
}

function verifyToken(req,res,next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization
    if (token) {
        Jwt.verify(token,jwtkey,(err,valid)=>{
            console.log(token);
            if (err) {
                console.log(chalk.red('Jwt Authentication Error'),err)
                res.status(401).send({error:"Invalid Token"})
            } else {
                console.log(chalk.green('Token verified'),valid)
                next()
            }
        })
    } else {
        console.log('please provide a token')
        res.status(403).send({error:"please provide a token"})
    }
}



app.post('/register', (req, res) => {
    if (validator.isEmail(req.body.email) && req.body.password && req.body.name) {
        let user = new User(req.body)
        user.save().then((result) => {
            result = result.toObject()
            delete result.password
            Jwt.sign({ user }, jwtkey ,{ expiresIn : "24h"} , (err,token) => {
                if (err){
                    console.log(err)
                    res.send({error:'Something went wrong, please try again later'})
                }
                console.log(chalk.green('New User created'), result,'\n',token);
                res.send({ result, auth:token })
            })
        }).catch((e) => {
            console.log(chalk.red('error', e))
        })
        
    } else {
        console.log(chalk.red('User registration : Not valid email | username | password'))
        res.json({'error':'Please provide a Username, Password and valid Email'})
    }
})

app.post('/login',(req,res)=>{
    time()
    console.log(req.body);
    if ( validator.isEmail(req.body.email) && req.body.password) {
        User.findOne(req.body).select('-password').then((user)=>{
            if(user) {
                Jwt.sign({ user }, jwtkey ,{ expiresIn : "24h"} , (err,token) => {
                    if (err){
                        console.log(err)
                        res.send({error:'Something went wrong, please try again later'})
                    }
                    console.log(chalk.green('User Found',user,'\n',token))
                    res.send({ user, auth:token })
                })
            } else {
                console.log(chalk.yellow('User Login : User Not Found'));
                res.send({error:'User Not Found'})
            }
        }).catch((error)=>{
            console.log(chalk.redBright('User Login error',error))
        })
    } else {
        console.log(chalk.red('User Login : Invalid Email or password'));
        res.json({'error':'please provide a valid email and password'})
    }
})

app.get('/profile/:id',(req,res)=>{
    time() 
    console.log(chalk.magenta('user Id - ',req.params.id))
    const _id = req.params.id
    User.findById( _id ).select('-password')
    .then((result)=>{
        if (result) {
            console.log(chalk.green('Get Profile : User found'),result)
            res.send(result)
        } else {
            console.log(chalk.yellow('Get Profile : User not found'))
            res.send({'error':'User not Found'})
        }
    })
    .catch((e)=>{
        console.log(chalk.redBright('Get Profile : Error\n'),e)
    })
})


app.put('/profile/:id',upload.single('image'), (req, res) => {
    console.log(req.params.id)
    console.log(req.file,req.body)
    const _id = req.params.id
    User.findByIdAndUpdate({ _id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        address: req.body.address,
        imageUrl: req.file?.path
    }).then((result) => {
        console.log(result)
        res.status(200).send({success:true,id:result._id})
    }).catch(e=>{
        console.log('error',e)
        res.status(404).send(result)
    })
})





    
    
    
    
    app.use('/admin',adminRouter)
    
    
    