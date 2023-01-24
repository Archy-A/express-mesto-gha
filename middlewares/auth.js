const jwt = require('jsonwebtoken');
const JWTWrongError = require('../errors/jwt-err');
const Constants = require('../utils/constants');

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
    req.user = payload;
    next();
  // } catch (err) {
  //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaattttttttttttttttttttttttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  //   next(new JWTWrongError(Constants.JWT_PROBLEM));
  // }
} catch (err) {
  return res
    .status(401)
    .send({ message: 'Необходима авторизация' });
}
  console.log('перед req.user===================================================================================')
  // req.user = payload;
  // next();
};
