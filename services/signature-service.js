  sha256 = require('sha256');
const sign = object => {
  const json = JSON.stringify(object);
  var hashing = sha256(json);
  return json;
};

module.exports = {
  sign
};
