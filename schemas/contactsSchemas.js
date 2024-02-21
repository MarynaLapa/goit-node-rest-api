import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(4).max(255).required().email(),
    phone: Joi.string().min(4).max(20).required(),
    favotite: Joi.boolean(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(255),
    email: Joi.string().min(4).max(255),
    phone: Joi.string().min(4).max(20),
    favorite: Joi.boolean(),
})

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})