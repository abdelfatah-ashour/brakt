const joi = require("joi");

function validateRegister(data) {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = {
  validateRegister,
};
