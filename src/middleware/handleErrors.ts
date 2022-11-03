import { Request, Response } from 'express';
import { STATUS_500 } from '../constants';
import { IError } from '../types';

export default (err: IError, req: Request, res: Response) => {
  const { statusCode = STATUS_500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
