const Joi = require('@hapi/joi');

class ProjectValidator {
  constructor(type) {
    this.type = type;
  }

  static searchValidator() {
    return Joi.alternatives().try(
      Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        genre: Joi.string(),
      }),
      Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        title: Joi.string(),
      }),
    );
  }

  static addValidator() {
    return Joi.object({
      title: Joi.string().required(),
      rating: Joi.number().min(0).max(10).required(),
      streaming_link: Joi.string().required(),
      genre: Joi.array().items(Joi.string().required()),
    });
  }

  static updateValidator() {
    return Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Id').required(),
      title: Joi.string(),
      rating: Joi.number().min(0).max(10),
      streaming_link: Joi.string(),
      genre: Joi.array().items(Joi.string()),
    });
  }

  validate(input) {
    let schema;
    switch (this.type) {
      case 'search': {
        schema = ProjectValidator.searchValidator();
        break;
      }
      case 'add': {
        schema = ProjectValidator.addValidator();
        break;
      }
      case 'update': {
        schema = ProjectValidator.updateValidator();
        break;
      }
      default: {
        break;
      }
    }
    return Joi.validate(input, schema, { convert: true, abortEarly: false });
  }
}

module.exports = ProjectValidator;
