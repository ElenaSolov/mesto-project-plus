import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}
interface IUserModel extends mongoose.Model<IUser> {
  findUserById: (id: string) => Promise<mongoose.Document<unknown, never, IUser>>
}

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});
userSchema.static('findUserById', function findUserById(id: string) {
  return this.findOne({ _id: id }) // this — это модель User
    .then((user) => user)
    // eslint-disable-next-line prefer-promise-reject-errors
    .catch(() => Promise.reject('Пользователя с таким id не существует'));
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);
