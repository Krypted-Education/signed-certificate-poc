const Bzz = require('web3-bzz'),
  bzz = new Bzz('http://localhost:8500');
// Keep different configurations, for future use.
bzz.setProvider('https://swarm.blockscan.com/');
// bzz.setProvider('https://open.swarm-gateways.net/');

const uploadToSwarm = file =>
  new Promise((resolve, reject) => {
    return bzz
      .upload(file)
      .then(function(hash) {
        resolve({ hash });
      })
      .catch(err => reject(err));
  });

module.exports = {
  uploadToSwarm
};