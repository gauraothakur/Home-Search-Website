var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var index = require("./routes/index");
var file = require("./routes/file");
var user = require("./routes/user");
var property = require("./routes/property");

var cors = require('cors')

var port = 3000;

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "client")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoDbURI = 'mongodb://localhost/RentalAppDb';
mongoose.connect(mongoDbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log("Connected to database");
});

app.use("/", index);
app.use("/api/file/", file);
app.use("/api/users/", user);
app.use("/api/properties", property);

app.listen(port, function () {
    console.log("Server started on: " + port);
});