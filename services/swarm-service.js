const Bzz = require('web3-bzz'),
  bzz = new Bzz('http://localhost:8500');
bzz.setProvider('http://swarm-gateways.net');

const uploadToSwarm = file =>
  new Promise((accept, reject) => {
    bzz
      .upload(dir)
      .then(function(hash) {
        resolve({ hash });
      })
      .catch(err => reject(err));
  });

module.exports = {
  uploadToSwarm
};
