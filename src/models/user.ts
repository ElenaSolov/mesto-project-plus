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
    minLength: [2, 'Должно быть минимум 2 буквы, получено {VALUE}'],
    maxLength: [30, 'Должно быть максимум 30 букв, получено {VALUE}'],
  },
  about: {
    type: String,
    required: true,
    minLength: [2, 'Должно быть минимум 2 буквы, получено {VALUE}'],
    maxLength: [200, 'Должно быть максимум 200 букв, получено {VALUE}'],
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
