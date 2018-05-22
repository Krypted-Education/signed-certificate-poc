const { downloadFromSwarm } = require('../services/swarm-service');

module.exports = app => {
  app.get('/api/get-diploma/:hash', (req, res) => {
    const hash = req.params.hash;
    downloadFromSwarm(hash)
      .then(result => {
        const file = result['/digitalProfile.ked'].data;
        // validate the file.
        res.status(200).json(JSON.parse(file));
      })
      .catch(err => res.status(500).json(err));
  });
};
