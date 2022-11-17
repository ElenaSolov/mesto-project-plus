import { NextFunction, Request, Response } from 'express';
import { messageServerError } from '../constants';
import { IError } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, req: Request, res: Response, _next: NextFunction) => {
  const { statusCode = 500, message = messageServerError } = err;
  console.log(1, err);
  res.status(statusCode).send({ message });
};
