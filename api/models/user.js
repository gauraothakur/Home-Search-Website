var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    userType: String,
    zipcode: String,
    profilePicture: String,
    fname: String,
    lname: String,
    contactEmail: String,
    properties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
       }],
    isProUser: Boolean,
    savedProperties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
       }]
})

/**
 *  Function called just before saving the user to database
 */
userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password'))
        return next()
    // hash password using bCrypt library
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err)
            return next(err)
        user.password = hash
        //console.log(user);
        next()
    });
});

module.exports = mongoose.model('User', userSchema)
