var express = require('express');
var router = express.Router();
var propertyController = require("./../controllers/property");

router.get('/', propertyController.getProperties);
router.post('/user/', propertyController.addProperty);
router.get('/user/:id', propertyController.getUserProperties);
router.put('/user/:id', propertyController.updateUserProperties );
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateUserProperty);

module.exports = router;