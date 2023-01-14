const chalk = require('chalk')
const Jwt = require('jsonwebtoken')
const jwtkey = process.env.JWT_KEY
const adminPassword = process.env.ADMIN_PASSWORD

const User = require('../Models/UserSchema');

exports.AdminLogin = (req, res) => {
    const { email, password } = req.body
    if (email === 'admin@gmail.com' && password === adminPassword) {
        Jwt
            .sign({ email, password }, jwtkey, { expiresIn: "24h" }, (err, token) => {
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
}

exports.getAllUsers = (req, res) => {
    User
        .find({}, 'name email')
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
}


exports.searchUser = async (req, res) => {
    console.log(req.params)
    let result = await User.find({
        $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { email: { $regex: req.params.key, $options: "i" } },
        ],
    })
    res.send(result);
}

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount > 0) {
                console.log('user deleted')
                res.send({ 'result': 'user deleted' })
            } else {
                console.log('user not found')
                res.send({ 'error': 'user not found' })
            }
            console.log('result:', result)
        })
        .catch((error) => {
            console.log(error)
            res.send({ 'error': error.message })
        })
}
