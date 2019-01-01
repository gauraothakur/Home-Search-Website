var express = require('express');
var router = express.Router();
var multer = require('multer');
var fileController = require("./../controllers/file");
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
var upload = multer({ dest: DIR }).single('photo');

//our file upload function.
router.post('/', function (req, res, next) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    // No error occured.
    path = req.file.path;
    return res.send("Upload Completed for " + path);
  });
})

router.get("/:filename", fileController.getFile)

module.exports = router;