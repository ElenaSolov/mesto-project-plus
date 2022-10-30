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

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  await User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(201).send({ name: user.name, about: user.about }))
    .catch((err) => res.status(400).send(err));
};

export default createUser;
