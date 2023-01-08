const chalk = require('chalk')
const express = require('express')
const router = express.Router()
const Jwt = require('jsonwebtoken')

const User = require('./db/User');


const jwtkey = process.env.JWT_KEY
const adminPassword = process.env.ADMIN_PASSWORD


router.post('/', (req, res) => {
    const { email, password } = req.body
    if (email === 'a' && password === adminPassword) {
        Jwt.sign({ email, password }, jwtkey, { expiresIn: "24h" }, (err, token) => {
            if (err) {
                console.log(err)
                res.send({ error: 'Something went wrong, please try again later' })
            }
            console.log(chalk.green('admin login success'), '\n', token);
            res.send({ adminAuth: token })
        })
    } else {
        console.log('error');
        res.send({ error: 'invalid email or password' })
    }
})


router.get('/users', (req, res) => {
    User.find({}, 'name email')
        .then(response => {
            if (response.length != 0) {
                console.log(chalk.green("Get All User Profiles : Profiles Found\n"))
                res.status(200).send(response)
            } else {
                console.log(chalk.yellow('Get All User Profiles : User Profile empty\n'))
                res.status(200).send({ result: 'No user profile found' })
            }
        })
        .catch(e => {
            console.log(chalk.red('Get All User Profiles : Error\n'), e)
            res.status(404).send({ error: 'server error' })
        })
})

router.get("/search/:key", async (req, res) => {
    let result = await User.find({
        $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { email: { $regex: req.params.key, $options: "i" } },
        ],
    });
    res.send(result);
});


router.delete('/user/:id',(req,res)=>{
    User.deleteOne({ _id :req.params.id })
        .then((result)=>{
            if (result.deletedCount > 0) {
                console.log('user deleted')
                res.send({'result':'user deleted'})
            } else {
                console.log('user not found')
                res.send({'error':'user not found'})
            }
            console.log('result:',result)
        })
        .catch((error)=>{
            console.log(error)
            res.send({'error':error.message})
        })
})

router.delete('/user',(req,res)=>{
    res.send({'error':'please provide user id'})
})



module.exports = router;