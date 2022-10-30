import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
import User from '../models/user';

// const createUser = (req: Request, res: Response) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => user.create({
//       name: req.body.name,
//       about: req.body.about,
//       avatar: req.body.avatar,
//       password: hash,
//     }))
//     .then((newUser) => res.status(201).send({ name: newUser.name, about: newUser.about }))
//     .catch((err) => res.status(400).send(err));
// };
export const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => console.log(err));
};

export const createUser = async (req: Request, res: Response) => {
  await User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(201).send({ name: user.name, about: user.about }))
    .catch((err) => res.status(400).send(err));
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findById(id).exec()
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ error: 'Пользователь не найден' }));
};

export const updateUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user._id;

  await User.findByIdAndUpdate(id, {
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  }, {
    new: true,
  }).exec()
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ error: 'Пользователь не найден' }));
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user._id;

  await User.findByIdAndUpdate(id, {
    avatar: req.body.avatar,
  }, {
    new: true,
  }).exec()
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ error: 'Пользователь не найден' }));
};
