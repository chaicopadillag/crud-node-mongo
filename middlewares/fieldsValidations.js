const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(421).json({ errors: errors.array() });
  }
  next();
};

module.exports = fieldsValidations;
