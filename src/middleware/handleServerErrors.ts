import { Request, Response } from 'express';
import { STATUS_500 } from '../constants';

interface Error {
  status?: number;
  message?: string;
}

const handleServerErrors = (err:Error, req:Request, res:Response) => {
  res.status(STATUS_500).send({ message: 'На сервере произошла ошибка' });
};

export default handleServerErrors;
