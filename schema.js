// defining joi schema to validate schema on server side

const Joi = require('joi');
const { schema } = require('./models/listing')

module.exports.lisitingSchema = Joi.object({//object come in joi
    listing: Joi.object({//listing is object
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});