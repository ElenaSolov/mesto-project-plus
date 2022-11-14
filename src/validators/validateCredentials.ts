import { celebrate, Joi } from 'celebrate';

import {
  messageNoEmailOrPassword,
  messageNotValidEmailOrPassword,
} from '../constants';

export default celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({ 'any.required': messageNoEmailOrPassword, 'string.email': messageNotValidEmailOrPassword }),
    password: Joi.string().min(6).required().messages({ 'any.required': messageNoEmailOrPassword, 'string.min': messageNotValidEmailOrPassword }),
  }).unknown(true),
});
