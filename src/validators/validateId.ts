import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import { messageNotValidId } from '../constants';

export const validateIdMongoose = (id: string) => mongoose.Types.ObjectId.isValid(id);
export const validateIdJoi = celebrate({
  params: {
    id: Joi.string().alphanum().length(24).required()
      .messages({
        'string.required': messageNotValidId,
        'string.alphanum': messageNotValidId,
        'string.length': messageNotValidId,
      }),
  },
});
