const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckoutInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'State field is required';
  }

  if (Validator.isEmpty(data.street)) {
    errors.street = 'Street field is required';
  }

  if (Validator.isEmpty(data.zipcode)) {
      errors.zipcode = 'Zipcode field is required';
  } else if (isNaN(data.zipcode)) {
      errors.zipcode = 'Zipcode must be a number';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};