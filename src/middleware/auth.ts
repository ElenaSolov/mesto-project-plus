import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { jwtsecret, needAuthorization, STATUS_401 } from '../constants';
import { IRequestWithAuth, IOwner } from '../types';

// eslint-disable-next-line consistent-return
export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(STATUS_401).send({ message: needAuthorization });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtsecret);
  } catch {
    return res.status(STATUS_401).send({ message: needAuthorization, err: 2 });
  }
  req.user = payload as IOwner;
  next();
};
