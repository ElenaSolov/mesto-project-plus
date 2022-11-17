import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { jwtsecret, messageAuthorizationFailed, messageNeedAuthorization } from '../constants';
import { IRequestWithAuth, IOwner } from '../types';
import NotAuthorizedError from '../errors/NotAuthorizedError';

export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    throw new NotAuthorizedError(messageNeedAuthorization);
  }
  let payload;
  try {
    payload = jwt.verify(token, jwtsecret);
  } catch {
    throw new NotAuthorizedError(messageAuthorizationFailed);
  }
  req.user = payload as IOwner;
  next();
};
