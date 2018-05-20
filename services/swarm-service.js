const rp = require('request-promise'),
  SWARM_GATEWAY = 'https://open.swarm-gateways.net/',
  BZZ_RAW = 'bzz-raw:/',
  BZZ = 'bzz:/';

const postOptions = (url, data) => {
  return {
    method: 'POST',
    uri: url,
    body: data,
    json: true
  };
};

const uploadToSwarm = file =>
  new Promise((resolve, reject) => {
    rp(postOptions(`${SWARM_GATEWAY}${BZZ_RAW}`, file)).then(hash => {
      rp(postOptions(`${SWARM_GATEWAY}${BZZ}${hash}/digitalProfile.ked`, file))
        .then(result => resolve(result))
        .catch(err => reject(err));
    }).catch(err => reject(err));
  });

module.exports = {
  uploadToSwarm
};