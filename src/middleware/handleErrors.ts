import { NextFunction, Request, Response } from 'express';
import { messageServerError, STATUS_500 } from '../constants';
import { IError } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, req: Request, res: Response, _next: NextFunction) => {
  const { statusCode = STATUS_500, message = messageServerError } = err;
  res.status(statusCode).send({ message });
};
