const express = require('express'),
  bodyParser = require('body-parser'),
  FileUploadController = require('./controllers/fileupload'),
  app = new express();

// change provider
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
FileUploadController(app);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
