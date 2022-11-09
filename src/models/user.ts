import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  defaultAbout,
  defaultAvatar,
  defaultName,
  messageAuthorizationFailed,
  messageUserIdNotFound,
} from '../constants';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  about?: string;
  avatar?: string;
}
interface IUserModel extends mongoose.Model<IUser> {
  findUserById: (id: string) => Promise<mongoose.Document<unknown, never, IUser>>;
  findUserByCredentials: (email: string, password: string) =>
    Promise<mongoose.Document<unknown, never, IUser>>
}

const userSchema = new Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Пароль должен быть не менее 6 символов, получено {VALUE}'],
    select: false,
  },
  name: {
    type: String,
    default: defaultName,
    minLength: [2, 'Должно быть минимум 2 буквы, получено {VALUE}'],
    maxLength: [30, 'Должно быть максимум 30 букв, получено {VALUE}'],
  },
  about: {
    type: String,
    default: defaultAbout,
    minLength: [2, 'Должно быть минимум 2 буквы, получено {VALUE}'],
    maxLength: [200, 'Должно быть максимум 200 букв, получено {VALUE}'],
  },
  avatar: {
    type: String,
    default: defaultAvatar,
  },
});
userSchema.static('findUserById', function findUserById(id: string) {
  return this.findOne({ _id: id }) // this — это модель User
    .then((user) => user)
    .catch(() => Promise.reject(messageUserIdNotFound));
});
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(messageAuthorizationFailed);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(messageAuthorizationFailed);
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);
