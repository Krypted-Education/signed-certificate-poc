const { downloadFromSwarm } = require('../services/swarm-service'), 
 { isSignedByKrypted } = require('../signature-validator'),
 { validateKryptedSignature } = require ('../services/signature-service'); 

module.exports = app => {
  app.get('/api/get-diploma/:hash', (req, res) => {
    const hash = req.params.hash;
    downloadFromSwarm(hash)
      .then(result => {
         const file = result['/digitalProfile.ked'].data;
         data = JSON.parse(file);
       if(isSignedByKrypted == validateKryptedSignature(data.kryptedSignature, data)){
         res.status(200).json(JSON.parse(file));
        }else{
         res.status(400).json(err);
        };
      })
      .catch(err => res.status(500).json(err));
  });
};
