const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description)
    ? data.description
    : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.value = !isEmpty(data.value) ? data.value : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
