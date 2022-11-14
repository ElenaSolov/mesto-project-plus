import { celebrate, Joi } from 'celebrate';
import {
  urlPattern,
  messageNotValidLink,
  messageNameNotValid,
  messageAboutNotValid,
} from '../constants';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30)
      .messages({ 'string.alphanum': messageNameNotValid, 'string.min': messageNameNotValid, 'string.max': messageNameNotValid }),
    avatar: Joi.string().uri().pattern(urlPattern)
      .message(messageNotValidLink),
    about: Joi.string().min(2).max(200)
      .messages({ 'string.min': messageAboutNotValid, 'string.max': messageAboutNotValid }),
  }).unknown(true),
});
