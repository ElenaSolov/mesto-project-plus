import { Request, Response, NextFunction } from 'express';
import { myUserId } from '../constants';

// temporary adds user Id to all requests
const addUserToRequest = (req : Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: myUserId,
  };
  next();
};

export default addUserToRequest;
