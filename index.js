const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  formidable = require('formidable'),
  multer = require('multer'),
  upload = multer(),
  Bzz = require('web3-bzz'),
  bzz = new Bzz('http://localhost:8500'),
  app = new express();

// change provider
bzz.setProvider('http://swarm-gateways.net');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
app.post('/fileupload', upload.single('thumbnail'), (req, res, next) => {
  const signatureFile = {
    name: req.body.name,
    surname: req.body.surname,
    file: req.file,
  };

  const dir = {
    "/signatureFile.txt": {
      type: "application/json",
      data: JSON.stringify(signatureFile)
    },
  };

  bzz.upload(dir)
    .then(function (hash) {
      res.status(200).json({ uploadedFile: signatureFile, hash: signatureFile });
    })
    .catch(err => res.status(500).json({ error: err, file: signatureFile }));
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});