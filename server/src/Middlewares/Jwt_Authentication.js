const jwtkey = process.env.JWT_KEY
const Jwt = require('jsonwebtoken')


exports.verifyToken = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization
    if (token) {
        Jwt
            .verify(token, jwtkey, (err, valid) => {
                console.log(token);
                if (err) {
                    console.log(chalk.red('Jwt Authentication Error'), err)
                    res.status(401).send({ error: "Invalid Token" })
                } else {
                    console.log(chalk.green('Token verified'), valid)
                    next()
                }
            })
    } else {
        console.log('please provide a token')
        res.status(403).send({ error: "please provide a token" })
    }
}
