import Joi from "joi";

export const attendeeSchema = Joi.object({
  meetup_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  will_attend: Joi.boolean().required(),
});
