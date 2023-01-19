const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const Controller = require('../Controllers/UserController')

router
    .post('/login',Controller.userLogin)
    .post('/register',Controller.createUser)

    .route('/profile/:id')
        .get(Controller.getUser)
        .put(upload.single('image'),Controller.updateUser)

module.exports = router;

