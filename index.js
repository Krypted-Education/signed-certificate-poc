  const express = require('express');
  var bodyParser = require('body-parser');
  fs = require('fs');
  formidable = require('formidable');
  var multer  = require('multer');
app = new express(); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
app.get('/', (req, res) => res.send(__dirname + '/index.html'));
app.post('/fileupload', (req, res) => {
console.log(req.body);
console.log(req.files);
res.status(200).json({'Content-Type': 'application/json'});
res.end('Success\n');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});