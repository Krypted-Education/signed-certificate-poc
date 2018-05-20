const crypto = require('crypto'),
  // This secret should move to an environment variable. Keeping the secret on the source code isn't secure at all.
  secret = 'u#*_wNN3ULKAsaYqFKxezg=-QgX&V8HPk@rgDVDv=Nu37T2+@$=9^^p$8QWj*ZPtr6%GC?EWmZy^QDmtuv8j_S3+bd2AW*tWwYZ#-#%+PW4h=!AxkGvfYxZKtzXvLQGV';

const sign = object => {
  const json = JSON.stringify(object);
  return crypto.createHmac('sha256', secret).update(json).digest('base64');
};

module.exports = {
  sign
};