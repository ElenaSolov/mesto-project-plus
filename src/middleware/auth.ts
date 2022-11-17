import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { jwtsecret, messageNeedAuthorization } from '../constants';
import { IRequestWithAuth, IOwner } from '../types';

export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    next(messageNeedAuthorization);
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, jwtsecret);
  } catch {
    next(messageNeedAuthorization);
  }
  req.user = payload as IOwner;
  next();
};
