const { uploadToSwarm } = require('../services/swarm-service'), { sign } = require('../services/signature-service');

module.exports = app => {
  app.post('/api/create/certificate', (req, res, next) => {
    const digitalProfile = {
      version: '0.1',
      profile: {
        name: req.body.name,
        surname: req.body.lastname,
        issuer: req.body.issuer,
        issuerSignature: req.body.issuerSignature,
        date: Date.now(),
        items: req.body.items,
        grade: req.body.grade,
        studentNumber: req.body.studentNumber,
        universityName: req.body.universityName,
      },
      kryptedSignature: ''
    };

    digitalProfile.kryptedSignature = sign(digitalProfile);

    const dir = {
      '/digitalProfile.ked': {
        type: 'application/json',
        data: JSON.stringify(digitalProfile)
      }
    };
    uploadToSwarm(dir)
      .then(result => {
        return res.status(200).json({ uploadedFile: digitalProfile, hash: result });
      })
      .catch(err => {
        return res.status(500).json({ error: err, file: digitalProfile });
      });
  });
};