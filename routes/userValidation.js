const { body } = require('express-validator');

const validateUser = [
  body('Fname').notEmpty().isString(),
  body('Lname').notEmpty().isString(),
  body('Contact').notEmpty().isString(),
  body('Email').notEmpty().isString(),
  body('Password').notEmpty().isString(),
];

module.exports = { validateUser };
