import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { jwtsecret, needAuthorization, STATUS_401 } from '../constants';
import { IGetUserAuthInfoRequest } from '../types';

// eslint-disable-next-line consistent-return
export default (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  console.log('auth', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(1);
    return res.status(STATUS_401).send({ message: needAuthorization });
  }
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, jwtsecret);
  } catch {
    return res.status(STATUS_401).send({ message: needAuthorization, err: 2 });
  }
  console.log('pay2', payload);
  req.user = payload;
  console.log(payload);
  next();
};
