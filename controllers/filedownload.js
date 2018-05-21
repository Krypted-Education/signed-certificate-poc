const { downloadFromSwarm } = require('../services/swarm-service');
module.exports = app => {
  app.get('/api/get-diploma/:hash', (req, res) => {
    const hash = req.params.hash;
    downloadFromSwarm(hash)
      .then(result => {
        res.status(200).sendFile(result);
      })
      .catch(err => res.status(500).json(err));
  });
};