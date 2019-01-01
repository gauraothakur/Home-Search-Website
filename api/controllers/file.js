module.exports.getFile = function(req, res) {
    // let fileReader = new FileReader();
    // fileReader.
    res.sendfile("./uploads/" + req.params.filename);
}