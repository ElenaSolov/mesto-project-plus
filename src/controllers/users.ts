import { Request, Response } from 'express';
import User from '../models/user';
import {
  STATUS_200, STATUS_400, STATUS_500, STATUS_404,
} from '../constants';

export const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => {
      res.status(STATUS_200).send(users);
    })
    .catch((err) => res.status(STATUS_500).send(err));
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(STATUS_400).send({ message: 'Proper name, about and avatar link should be provided' });
    return;
  }
  await User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(201).send({ name: user.name, about: user.about }))
    .catch((err) => res.status(STATUS_500).send(err));
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findById(id).exec()
    .then((user) => res.status(STATUS_200).send(user))
    .catch(() => res.status(STATUS_404).send({ message: 'Пользователь не найден' }));
};

export const updateUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(STATUS_400).send({ message: 'Proper name and about should be provided' });
    return;
  }
  await User.findByIdAndUpdate(id, {
    name,
    about,
  }, {
    new: true,
  }).exec()
    .then((user) => res.status(STATUS_200).send(user))
    .catch(() => res.status(STATUS_404).send({ message: 'Пользователь не найден' }));
};

export const updateUserAvatar = async (req: Request, res: Response) => {
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
