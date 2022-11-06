import { Request, Response } from 'express';
import User from '../models/user';
import {
  STATUS_200, STATUS_400, STATUS_500, STATUS_404,
} from '../constants';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_200).send(users);
    })
    .catch((err) => res.status(STATUS_500).send(err));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(STATUS_400).send({ message: 'Proper name, about and avatar link should be provided' });
    return;
  }
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_400).send(err.message);
      } else {
        res.status(STATUS_500).send(err);
      }
    });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findUserById(id).then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'Пользователя с таким id не существует') {
        res.status(STATUS_404).send({ message: 'Пользователя с таким id не существует' });
      } else {
        res.status(STATUS_500).send({ message: 'Ошибка сервера' });
      }
    });
};

export const updateUserProfile = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(STATUS_400).send({ message: 'Proper name and about should be provided' });
    return;
  }
  User.findByIdAndUpdate(id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  }).exec()
    .then((user) => res.status(STATUS_200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(STATUS_500).send({ message: 'Ошибка сервера' });
      }
    });
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = req.user._id;
  const { avatar } = req.body;
  if (!avatar) {
    res.status(STATUS_400).send({ message: 'Please provide link for new avatar' });
    return;
  }
  await User.findByIdAndUpdate(id, {
    avatar: req.body.avatar,
  }, {
    new: true,
  }).exec()
    .then((user) => res.status(STATUS_200).send(user))
    .catch(() => res.status(STATUS_404).send({ message: 'Пользователь не найден' }));
};
