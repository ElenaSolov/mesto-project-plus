import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Error } from 'mongoose';

export interface IOwner extends JwtPayload {
  _id: string;
}
export interface IRequestWithAuth extends Request {
  user?: IOwner;
}

export interface IError extends Error {
  name: string;
  code?: number;
}
