import { celebrate, Joi } from 'celebrate';
import { messageNotValidId } from '../constants';

export default celebrate({
  params: {
    cardId: Joi.string().alphanum().length(24).required()
      .messages({
        'string.required': messageNotValidId,
        'string.alphanum': messageNotValidId,
        'string.length': messageNotValidId,
      }),
  },
});
