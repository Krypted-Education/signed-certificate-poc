  sha256 = require('sha256');
const sign = object => {
  const json = JSON.stringify(object);
  const hashing = sha256(json);
  const json=hashing;
  return json;
};

module.exports = {
  sign
};
