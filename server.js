// Dependencies
// =============================================================
var express = require("express");

var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/images"));

// Add application routes
require(path.join(__dirname, 'app/routing/apiRoutes'))(app);
require(path.join(__dirname, 'app/routing/htmlRoutes'))(app);

// listener//
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });



