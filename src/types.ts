import { Date, Types } from 'mongoose';

export interface IError {
  statusCode?: number;
  message?: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: [];
  createdAt: Date
}
export interface IUser {
  name: string;
  about: string;
  avatar: string;
}
