const express = require('express');
var bodyParser = require('body-parser');
fs = require('fs'),
formidable = require('formidable'),
app = new express(); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);

app.use("/", express.static("static"));
app.post("/uploadfile", function (req, res) {
  console.log(req.body.individualName);
  console.log(req.body.individualLastName);
  console.log(req.body.fileInput);
});
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});