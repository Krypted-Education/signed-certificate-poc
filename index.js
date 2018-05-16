const express = require('express');
var bodyParser = require('body-parser');
fs = require('fs'),
formidable = require('formidable'),
app = new express(); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);

app.use("/", express.static("static"));
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  response = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.listen(app.get('port'), () => {
console.log('Node app is running on port', app.get('port'));
});