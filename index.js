const express = require('express'),
  bodyParser = require('body-parser'),
  FileUploadController = require('./controllers/fileupload'),
  FileDownloadController = require('./controllers/filedownload'),
  app = new express();

// change provider
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);

app.use('/', express.static('static'));
FileUploadController(app);
FileDownloadController(app);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
