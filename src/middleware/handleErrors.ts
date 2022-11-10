import { NextFunction, Request, Response } from 'express';
import {
  messageNotValidEmailOrPassword,
  messageServerError,
  STATUS_400,
  STATUS_404,
  STATUS_409,
  STATUS_500,
  messageUserAlreadyExist,
  messageUserIdNotFound,
  VALIDATION_ERROR,
  messageNameOrAboutNotProvided,
  messageCardIdNotProvided,
  messageLinkNotProvided,
  messageNameOrLinkNotProvided,
  messageNeedAuthorization,
  messageAuthorizationFailed, STATUS_401,
  messageCardNotFound, messageNoRights, messageNotValidId, messageNotValidLink, CAST_ERROR,
} from '../constants';
import { IError } from '../types';

const makeError = (err: string) => ({ message: err });

export default (err: IError | string, req: Request, res: Response, next: NextFunction) => {
  if (typeof err !== 'string') {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(STATUS_409).send(messageUserAlreadyExist);
    }
    if (err.name === CAST_ERROR || err.name === VALIDATION_ERROR) {
      return res.status(STATUS_400).send(makeError(err.message));
    }
  }
  switch (err) {
    case messageNotValidEmailOrPassword:
    case messageNotValidId:
    case messageNotValidLink:
    case VALIDATION_ERROR:
    case messageNameOrAboutNotProvided:
    case messageLinkNotProvided:
    case messageNameOrLinkNotProvided:
    case messageCardIdNotProvided:
    case messageNoRights:
      res.status(STATUS_400).send(makeError(err));
      break;
    case messageUserAlreadyExist:
      res.status(STATUS_409).send(makeError(err));
      break;
    case messageUserIdNotFound:
    case messageCardNotFound:
      res.status(STATUS_404).send(makeError(err));
      break;
    case messageNeedAuthorization:
    case messageAuthorizationFailed:
      res.status(STATUS_401).send(makeError(err));
      break;
    default:
      res.status(STATUS_500).send(makeError(messageServerError));
  }
  next();
};
