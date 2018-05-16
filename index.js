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

app.post('/', function(req, res) {
var username = req.body.username;
res.send('<h1>Hello</h1>'+username);
});
app.listen(app.get('port'), () => {
console.log('Node app is running on port', app.get('port'));
});