const { uploadToSwarm } = require('../services/swarm-service'),
  { sign } = require('../services/signature-service');

module.exports = app => {
  app.post('/fileupload', (req, res, next) => {
    const digitalProfile = {
      version: '0.1',
      profile: {
        name: req.body.name,
        surname: req.body.surname,
        issuer: req.body.issuer,
        date: req.body.date
      },
      signature: ''
    };

    digitalProfile.signature = sign(digitalProfile);

    const dir = {
      '/digitalProfile.ked': {
        type: 'application/json',
        data: JSON.stringify(digitalProfile)
      }
    };
    uploadToSwarm(dir)
      .then(result =>
        res.status(200).json({ uploadedFile: signatureFile, hash: result.hash })
      )
      .catch(err => res.status(500).json({ error: err, file: signatureFile }));
  });
};
