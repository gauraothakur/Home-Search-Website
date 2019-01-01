var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var User = mongoose.model('User');
/**
 * REST call to get User from user id
 */
module.exports.getUser = function (req, res) {
    let token = jwt.decode(req.params.token, "SECRET");
    User.findOne({ _id: token.sub }, (err, user) => {
        res.status(200).send(user);
    });
};

/**
 * REST call to update User basic Information
 */
module.exports.updateUser = function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
        res.status(200).send(user);
    });
};


/**
 * REST call to update User properties
 */
module.exports.removeUserSavedProperty = function (req, res) {
    console.log(req.params);
    User.findOneAndUpdate(
        { _id: req.params.id }, 
        { $pull : { savedProperties: req.params.prop_id}},
        { new: true },
        (err, user) => {
            if(err){
                console.log(err);
                return res.status(500).send({ message: 'Error removing saved properties user' })
            }
            console.log("Remove method");
            console.log(user.savedProperties);
            return res.status(200).send();
        });
};



