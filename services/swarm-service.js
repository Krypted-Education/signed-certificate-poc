const rp = require('request-promise'),
  SWARM_GATEWAY = 'https://open.swarm-gateways.net/',
  BZZ_RAW = 'bzz-raw:/',
  BZZ = 'bzz:/',
  BZZ_IMMUTABLE = 'bzz-immutable:/';

const prepareOptions = (url, data, method) => {
  return {
    method: method,
    uri: url,
    body: data,
    json: true
  };
};

const uploadToSwarm = file =>
  new Promise((resolve, reject) => {
    rp(prepareOptions(`${SWARM_GATEWAY}${BZZ_RAW}`, file, 'POST'))
      .then(hash => {
        rp(
          prepareOptions(`${SWARM_GATEWAY}${BZZ}${hash}/digitalProfile.ked`, file, 'POST')
        )
          .then(result => resolve(result))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

const downloadFromSwarm = hash =>
  new Promise((resolve, reject) => {
    rp(
      prepareOptions(
        `${SWARM_GATEWAY}${BZZ_IMMUTABLE}${hash}/digitalProfile.ked`,
        hash,
        'GET'
      )
    )
      .then(file => {
        resolve(file);
      })
      .catch(err => reject(err));
  });
module.exports = {
  uploadToSwarm,
  downloadFromSwarm
};
