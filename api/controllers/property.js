var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var Property = mongoose.model('Property');
var User = mongoose.model('User');

/**
 * REST call to add property Information
 */
module.exports.addProperty = function (req, res) {
    console.log("request");
    let propertyDetails = req.body;
    console.log(req.body.addedBy._id);
    try {
        User
            .findById(req.body.addedBy._id)
            .populate('properties')
            .exec(function (err, user) {
                if (!err) {
                    let property = new Property(propertyDetails)
                    property.save((err, newProperty) => {

                        if (err)
                            return res.status(500).send({ message: 'Error occurred while saving user' })
                        console.log(newProperty);

                        res.status(200).send(newProperty);
                    })
                    user.properties.push(property);
                    user.save(function (err) {
                        if (err) {
                            console.log("error in user save");
                        }
                    });

                }
                else
                    console.log("error occurred while saving property");
            })
    }
    catch (e) {
        console.log("error in property service AddProperty");
    }
};


module.exports.updateProperty = function (req, res) {
    console.log("request");
    let propertyDetails = req.body;
    console.log(req.body.addedBy._id);
    try {
        User
            .findById(req.body.addedBy._id)
            .populate('properties')
            .exec(function (err, user) {
                if (!err) {
                    let property = new Property(propertyDetails)
                    property.save((err, newProperty) => {

                        if (err)
                            return res.status(500).send({ message: 'Error occurred while saving user' })
                        console.log(newProperty);

                        res.status(200).send(newProperty);
                    })
                    user.properties.push(property);
                    user.save(function (err) {
                        if (err) {
                            console.log("error in confirmOrder save");
                        }
                    });

                }
                else
                    console.log("error occurred while saving property");
            })
    }
    catch (e) {
        console.log("error in property service AddProperty");
    }
};
/**
 * REST call to get User properties
 */
module.exports.getUserProperties = function (req, res) {
    User
        .findById(req.params.id)
        .populate("properties")
        .populate("savedProperties")
        .exec((err, user) => {
            if (!err) {
                console.log(user.properties);
                res.status(200).send(user);
            }

        })
};

/**
 * REST call to get properties
 */
module.exports.getProperties = function (req, res) {

    let search = req.query.search;
    console.log(req.query.search);
    let amenities = req.query.amenities;
    if (search) {
        req.query.$text = { $search: search };
        delete req.query.search;
    }
    if (amenities) {
        delete req.query.amenities;
    }
    Property.find(req.query, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (amenities) {
            let finalResult = [];
            for (let property of result) {
                if (property.amenities) {
                    for (let amenity of property.amenities) {
                        console.log(amenity)
                        if (amenities.includes(amenity)) {
                            finalResult.push(property);
                            break;
                        }
                    }
                }
            }
            res.status(200).send(finalResult);
        } else {
            res.status(200).send(result);
        }
    })
};

/**
 * REST call to update User properties
 */
module.exports.updateUserProperties = function (req, res) {
    console.log("SavedProperties");
    console.log(req.body.savedProperties);
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { savedProperties: req.body.savedProperties, properties: req.body.properties } },
        { new: true },
        (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Error while updating user' })
            }
            return res.status(200).send(user);
        });
};

/**
 * REST get property by ID
 */
module.exports.getPropertyById = function (req, res) {
    Property.findById(req.params.id, (err, property) => {
        if (err)
            console.log("Error finding property")
        return res.status(200).send(property);
    });
};

/**
 * REST call to update User properties
 */
module.exports.updateUserProperty = function (req, res) {
    //     Property.findOneAndUpdate(
    //         { _id: req.params.id },
    //         // { $addToSet : { savedProperties: req.body.savedProperties, properties: req.body.properties }},
    //         (err, user) => {
    //             console.log(user)
    //             if (err) {
    //                 console.log(err);
    //                 return res.status(500).send({ message: 'Error while updating user' })
    //             }
    //             return res.status(200).send(user);
    //         });
    Property.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, property) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error while updating property' })
        }
        return res.status(200).send(property);
    }
    );
};
