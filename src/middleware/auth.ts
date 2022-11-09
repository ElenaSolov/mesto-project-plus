import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { jwtsecret, messageNeedAuthorization } from '../constants';
import { IRequestWithAuth, IOwner } from '../types';

// eslint-disable-next-line consistent-return
export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(messageNeedAuthorization);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtsecret);
  } catch {
    next(messageNeedAuthorization);
  }
  req.user = payload as IOwner;
  next();
};
