import { celebrate, Joi } from 'celebrate';
import {
  urlPattern,
  messageNotValidLink,
} from '../constants';

export default celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().pattern(urlPattern).required()
      .messages({ 'string.uri': messageNotValidLink, 'any.required': messageNotValidLink, 'string.pattern': messageNotValidLink }),
  }).unknown(true),
});
