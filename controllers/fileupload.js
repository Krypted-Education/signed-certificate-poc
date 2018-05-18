const { uploadToSwarm } = require('../services/swarm-service');

module.exports = app => {
  app.post('/fileupload', (req, res, next) => {
    const signatureFile = {
      name: req.body.name,
      surname: req.body.surname
    };

    const dir = {
      '/signatureFile.txt': {
        type: 'application/json',
        data: JSON.stringify(signatureFile)
      }
    };
    uploadToSwarm(dir)
      .then(result =>
        res.status(200).json({ uploadedFile: signatureFile, hash: result.hash })
      )
      .catch(err => res.status(500).json({ error: err, file: signatureFile }));
  });
};
