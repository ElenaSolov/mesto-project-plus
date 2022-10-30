import mongoose, { Schema, Date } from 'mongoose';

export interface Icard {
  name: string;
  link: string;
  owner: string;
  likes: [];
  createdAt: Date
}
const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Icard>('card', cardSchema);
