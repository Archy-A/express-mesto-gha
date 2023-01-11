const Constants = require('../utils/constants');

exports.processUnexist = (req, res) => {
  res.status(Constants.HTTP_NOT_FOUND).send({ message: Constants.PAGE_NOT_FOUND });
};
