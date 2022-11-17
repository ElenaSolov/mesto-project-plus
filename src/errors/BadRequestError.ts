import { STATUS_400 } from '../constants';

export default class BadRequestError extends Error {
  private statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = STATUS_400;
  }
}
