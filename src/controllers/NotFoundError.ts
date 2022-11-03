import { IError } from '../types';

class NotFoundError extends Error implements IError {
  public statusCode: number;

  constructor(message : string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
