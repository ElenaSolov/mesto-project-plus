import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IOwner extends JwtPayload {
  _id: string;
}
export interface IRequestWithAuth extends Request {
  user: IOwner;
}
