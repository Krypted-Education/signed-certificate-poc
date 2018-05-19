  sha256 = require('sha256');
const sign = object => {
  const json = JSON.stringify(object);
  var hashing = sha256(json);
  // TODO: sign the json string and return the signature here.
  console.log(hashing);
  return json;
};

module.exports = {
  sign
};
