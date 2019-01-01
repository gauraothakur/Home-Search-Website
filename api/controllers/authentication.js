var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
var moment = require('moment')

/**
 * Register a new User
 * Set the User token.
 * 
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.register = function (req, res) {
    var registrationData = req.body
    User.findOne({ email: registrationData.email }, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'Error while finding the user' })
        if (user)
            return res.status(401).send({ message: 'Email address already in use' })
        var user = new User(registrationData)
        console.log(user)
        user.save((err, newUser) => {
            if (err)
                return res.status(500).send({ message: 'Error occurred while saving user' })
            GenerateAndSendJwtToken(res, newUser)
        })
    })

};

/**
 * Authenticate an existing User.
 * 
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.login = function (req, res) {
    var userLoginData = req.body
    console.log("This is the login Data" + userLoginData)
    User.findOne({ email: userLoginData.email }, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'Error while finding the user' })
        if (!user)
            return res.status(401).send({ message: 'Email address does not exist' })
        // Compare password using bcrypt
        bcrypt.compare(userLoginData.password, user.password, (err, isMatch) => {
            if (!isMatch)
                return res.status(401).send({ message: 'Invalid Password' })
            GenerateAndSendJwtToken(res, user)
            console.log("Login successFull");
        })
    })
};

function GenerateAndSendJwtToken(res, user) {
    var payload = {
        sub: user._id,
        exp: moment().add(60, 'days').format()
        //exp: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    var token = jwt.encode(payload, 'SECRET')
    res.status(200).send({ token, payload })
}