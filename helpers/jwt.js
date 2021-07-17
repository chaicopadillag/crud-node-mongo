const jwt = require('jsonwebtoken');

const generarJsonWebToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRET_KEY_TOKEN, { expiresIn: '24h' }, (error, token) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generarJsonWebToken };
