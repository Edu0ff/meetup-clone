import Joi from "joi";

export const meetupSchema = Joi.object({
  title: Joi.string().max(255).required(),
  picture: Joi.string().uri().required(),
  theme: Joi.string().max(255).required(),
  location: Joi.string().max(255).required(),
  date: Joi.date().iso().required(),
  time: Joi.string().max(255).required(),
  attendeesCount: Joi.number().integer().min(0).required(),
});
