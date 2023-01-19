const validator = require('validator')
const chalk = require('chalk')
const Jwt = require('jsonwebtoken')
const User = require('../Models/UserSchema');
const date = require('date-and-time');
const jwtkey = process.env.JWT_KEY

function time() {
    const now = new Date();
    console.log('\n',date.format(now, 'hh:mm:ss A'));
}
module.exports = {
    userLogin(req, res){
        time()
        if (validator.isEmail(req.body.email) && req.body.password) {
            User
                .findOne(req.body)
                .select('-password')
                .then((user) => {
                if (user) {
                        Jwt.sign({ user }, jwtkey, { expiresIn: "24h" }, (err, token) => {
                            if (err) {
                                console.log(err)
                                res.send({ error: 'Something went wrong, please try again later' })
                            }
                            console.log(chalk.green('User Found', user, '\n', token))
                            res.send({ user, auth: token })
                        })
                    } else {
                        console.log(chalk.yellow('User Login : User Not Found'));
                        res.send({ error: 'User Not Found' })
                    }
                }).
                catch(error => console.log(chalk.redBright('User Login error', error)))
        } else {
            console.log(chalk.red('User Login : Invalid Email or password'));
            res.json({ 'error': 'please provide a valid email and password' })
        }
    },
    getUser(req, res){
        time()
        console.log(chalk.magenta('user Id - ', req.params.id))
        const _id = req.params.id
        User
            .findById(_id)
            .select('-password')
            .then((result) => {
                if (result) {
                    console.log(chalk.green('Get Profile : User found'), result)
                    res.send(result)
                } else {
                    console.log(chalk.yellow('Get Profile : User not found'))
                    res.send({ 'error': 'User not Found' })
                }
            })
            .catch((e) => {
                console.log(chalk.redBright('Get Profile : Error\n'), e)
            })
    },
    updateUser(req, res){
        console.log(req.params.id)
        console.log(req.file, req.body)
        const _id = req.params.id
    
        User
            .findByIdAndUpdate({ _id }, {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                address: req.body.address,
                imageUrl: req.file?.path
            })
            .then((result) => {
                console.log(result)
                res.status(200).send({ success: true, id: result._id })
            })
            .catch(e => {
                console.log('error', e)
                res.status(404).send(result)
            })
    },
    createUser(req, res){
        console.log(req.body)
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
    }

}









