const { validateKryptedSignature, validateEthereumSignature } = require('./services/signature-service');

const sampleObject = {
  "/digitalProfile.ked": {
    "type": "application/json",
    "data": "{\"version\":\"0.1\",\"profile\":{\"name\":\"Mert\",\"surname\":\"Susur\",\"issuer\":\"0xa38836e965075ce4e92919fe8236bd3ab4bb136f\",\"issuerSignature\":\"0xc5d6399201ee4b535f13202fb7f04bc4156686cbb5ea4e299e28cd4479f01c850cab44fc0af264e587f6466a0cc504b9b3f733cd20f891e27f8a1b8c069a36de1b\",\"date\":1526949924608,\"items\":[{\"title\":\"Math\",\"grade\":\"AA\"}],\"grade\":\"2.23\",\"studentNumber\":\"2391023\",\"universityName\":\"Kocaeli Unv\",\"issuerAuthority\":\"Krypted\"},\"kryptedSignature\":\"ZQlt2jMAJTcKEbgPTlww5oMGiIYNREiqsNz9d8MU1UA=\"}"
  }
}

var dataJson = sampleObject["/digitalProfile.ked"].data;

data = JSON.parse(dataJson);
const isSignedByKrypted = validateKryptedSignature(data.kryptedSignature, data);
console.log(`isSignedByKrypted: ${isSignedByKrypted}`);

const issuer = data.profile.issuer;
const issuerSignature = data.profile.issuerSignature;

const isSignedByTheIssuer = validateEthereumSignature(issuerSignature, issuer, data);
console.log(`isSignedByTheIssuer: ${isSignedByTheIssuer}`);