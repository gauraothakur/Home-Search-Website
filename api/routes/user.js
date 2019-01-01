var express = require('express');
var router = express.Router();
var userController = require("./../controllers/user");
var propertyController = require("./../controllers/property");

//route to get a user by sending a token
router.get('/:token', userController.getUser);

//route to update a user details
router.put('/:id', userController.updateUser);
router.get('/:id/properties/', propertyController.getUserProperties);
router.put('/:id/properties/', propertyController.updateUserProperties );
router.post('/:id/properties/', propertyController.addProperty);
router.delete('/:id/properties/:prop_id', userController.removeUserSavedProperty);

//creates a router as a module and export it
module.exports = router;