import { messageNoRights, STATUS_403 } from '../constants';

export default class NoRightsError extends Error {
  private statusCode: number;

  constructor() {
    super(messageNoRights);
    this.statusCode = STATUS_403;
  }
}
