var User = require('../models/user.js')
var property = require('../models/property.js')
var jwt = require('jwt-simple')
var express = require("express")
var router = express.Router()
var authController = require('../controllers/authentication');

var auth = {
    router,
    // Todo: This function will be used later when we actually do the authorization based on routes
    authCheck: (req, res, next) => {
        if (!req.header('authorization'))
            return res.status(401).send({ message: 'Unauthorized. Auth Header is missing' })

        var token = req.header('authorization').split(' ')[1]

        var payload = jwt.decode(token, 'SECRET', false)
        console.log(payload.exp);
        console.log(Date.now());
        if (!payload)
            return res.status(401).send({ message: 'Unauthorized. Auth Header is not valid' })
        if (payload.exp <= Date.now())
            return res.status(400).send({ message: 'Access token has expired' })

        req.userId = payload.sub
        next()
    }
}
router.get("/", function (req, res, next) {
    res.render("index.html");
})

router.get("/:filename", function (req, res, next) {
    res.sendfile("./views/" + req.params.filename);
})

router.get("/assets/:filename", function (req, res, next) {
    res.sendfile("./views/assets/" + req.params.filename);
})

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);


module.exports = router;