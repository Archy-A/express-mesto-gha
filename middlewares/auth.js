const jwt = require('jsonwebtoken');
const JWTWrongError = require('../errors/jwt-err.js');
const Constants = require("../utils/constants");

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new JWTWrongError(Constants.JWT_PROBLEM);
  }
  req.user = payload;
  next();
};