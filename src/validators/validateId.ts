import { celebrate, Joi } from 'celebrate';
import { messageNotValidId } from '../constants';

export default celebrate({
  params: {
    id: Joi.string().hex().length(24).required()
      .messages({
        'string.required': messageNotValidId,
        'string.hex': messageNotValidId,
        'string.length': messageNotValidId,
      }),
  },
});
