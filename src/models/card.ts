import mongoose, { Schema, Date, Types } from 'mongoose';
import validator from 'validator';
import { messageNotValidLink } from '../constants';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: [];
  createdAt: Date
}
const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Должно быть минимум 2 буквы, получено {VALUE}'],
    maxLength: [30, 'Должно быть максимум 200 букв, получено {VALUE}'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: messageNotValidLink,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'likes',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
