const joi = require("joi");

function checkCreateArticle(data) {
  const schema = joi.object({
    title: joi.string().required(),
    category: joi.string().min(3).required(),
    tags: joi.array().min(2).required(),
    description: joi.string().required(),
    content: joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = {
  checkCreateArticle,
};
