import { celebrate, Joi } from 'celebrate';
import {
  urlPattern, messageNotValidLink,
  messageNameOrLinkNotProvided, messageLinkNotProvided,
} from '../constants';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .messages({ 'string.empty': messageNameOrLinkNotProvided, 'any.required': messageNameOrLinkNotProvided }),
    link: Joi.string().uri().pattern(urlPattern).required()
      .messages({
        'string.uri': messageNotValidLink,
        'any.required': messageLinkNotProvided,
        'string.pattern.base': messageNotValidLink,
      }),
  }).unknown(true),
});
