const express = require('express'),
  fs = require('fs'),
  formidable = require('formidable'),
 app = new express();
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
console.log('Node app is running on port', app.get('port'));
});