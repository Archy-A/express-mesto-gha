const jwt = require('jsonwebtoken');
// const JWTWrongError = require('../errors/jwt-err');
// const Constants = require('../utils/constants');

const extractBearerToken = function (header) {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  console.log('>>>>>>>>>>>>>>>>>> req.headers.authorization = ', req.headers.authorization)
  const { authorization } = req.headers;
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
    req.user = payload;
    next();
    // } catch (err) {
    //   // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //   next(new JWTWrongError(Constants.JWT_PROBLEM));
    // }
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // req.user = payload;
  // next();
  return null;
};
