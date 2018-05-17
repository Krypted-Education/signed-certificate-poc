  const express = require('express');
  var bodyParser = require('body-parser');
  fs = require('fs');
  formidable = require('formidable');
  var multer  = require('multer');
  var upload = multer();
app = new express(); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
app.get('/', (req, res) => res.send(__dirname + '/index.html'));
app.post('/fileupload', upload.single('thumbnail'), function (req, res, next) {
  // req.body contains the text fields
  console.log(req.body);
  console.log(req.file);
  var jsonObject = {
    name: req.body.name,
    surname: req.body.surname,
    file: new Buffer(fs.readFileSync(req.file.path, 'utf8')),
  };
  console.log(jsonObject);
  res.end('Success\n');
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});