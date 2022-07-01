const Joi = require('joi');

const schema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(30)
        .required(),
    editora: Joi.string()
        .min(3)
        .max(30)
        .required(),
    anoPublicacao: Joi.string()
        .min(3)
        .max(30)
        .required(),
})

module.exports = schema;