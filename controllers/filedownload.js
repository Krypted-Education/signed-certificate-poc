const {
  downloadFromSwarm
} = require('../services/swarm-service'), {
  validateKryptedSignature,
  validateEthereumSignature
} = require('../services/signature-service');

const checkKryptedSignature = (certificate) => new Promise((resolve, reject) => {
  const isSignedByKrypted = validateKryptedSignature(certificate.kryptedSignature, certificate);
  if (!isSignedByKrypted) {
    return reject({ error: 'Certificate not signed by Krypted.' });
  }
  return resolve(certificate);
});

const checkEthereumSignature = (certificate) => new Promise((resolve, reject) => {
  const issuer = certificate.profile.issuer;
  const issuerSignature = certificate.profile.issuerSignature;
  const isSignedByTheIssuer = validateEthereumSignature(issuerSignature, issuer, certificate);
  if (!isSignedByTheIssuer) {
    return reject({ error: 'Invalid issuer certificate' });
  }
  return resolve(certificate);
});

module.exports = app => {
  app.get('/api/get-diploma/:hash', (req, res) => {
    const hash = req.params.hash;
    downloadFromSwarm(hash)
      .then(result => {
        const fileJson = result['/digitalProfile.ked'].data,
          certificate = JSON.parse(fileJson);

        checkKryptedSignature(certificate)
          .then(cert => checkEthereumSignature(cert))
          .then(cert => res.status(200).json(cert.profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(500).json(err));
  });
};