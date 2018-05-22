const crypto = require('crypto'),
  EthCrypto = require('eth-crypto'),
  // This secret should move to an environment variable. Keeping the secret on the source code isn't secure at all.
  secret = 'u#*_wNN3ULKAsaYqFKxezg=-QgX&V8HPk@rgDVDv=Nu37T2+@$=9^^p$8QWj*ZPtr6%GC?EWmZy^QDmtuv8j_S3+bd2AW*tWwYZ#-#%+PW4h=!AxkGvfYxZKtzXvLQGV';

const sign = object => {
  const json = JSON.stringify(object);
  return crypto.createHmac('sha256', secret).update(json).digest('base64');
};

const validateKryptedSignature = (signature, object) => {
  object.kryptedSignature = '';
  const result = sign(object);
  return result === signature;
};

const validateEthereumSignature = (signature, address, object) => {
  const signatureMessage = `I, ${object.profile.issuerAuthority}, signing this diploma as the issuer`;

  const signer = EthCrypto.recoverPublicKey(
    signature,
    EthCrypto.hash.keccak256(signatureMessage)
  );
  return signer === address;
};

module.exports = {
  sign,
  validateKryptedSignature,
  validateEthereumSignature
};