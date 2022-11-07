import { Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {
  STATUS_400,
  STATUS_500,
  STATUS_404,
  VALIDATION_ERROR,
  userIdNotFound,
  serverError,
  nameOrAboutNotProvided, CAST_ERROR, linkNotProvided,
  notValidEmailOrPassword, ONE_WEEK, ONE_WEEK_IN_MS, jwtsecret,
} from '../constants';
import { IGetUserAuthInfoRequest } from '../types';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(STATUS_500).send({ message: serverError }));
};

export const createUser = (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !validator.isEmail(email) || !password) {
    res.status(STATUS_400).send({ message: notValidEmailOrPassword });
    return;
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        res.status(STATUS_400).send({ message: err.message });
      } else {
        res.status(STATUS_500).send({ message: serverError });
      }
    });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findUserById(id).then((user) => {
    if (!user) {
      res.status(STATUS_404).send({ message: userIdNotFound });
    } else {
      res.send(user);
    }
  })
    .catch((err) => {
      if (err === userIdNotFound) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else {
        res.status(STATUS_500).send({ message: serverError });
      }
    });
};

export const updateUserProfile = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(STATUS_400).send({ message: nameOrAboutNotProvided });
    return;
  }
  User.findByIdAndUpdate(id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  }).exec()
    .then((user) => {
      if (!user) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else {
        res.status(STATUS_500).send({ message: serverError });
      }
    });
};

export const updateUserAvatar = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = req.user._id;
  const { avatar } = req.body;
  if (!avatar) {
    res.status(STATUS_400).send({ message: linkNotProvided });
    return;
  }
  User.findByIdAndUpdate(id, {
    avatar: req.body.avatar,
  }, {
    new: true,
    runValidators: true,
  }).exec()
    .then((user) => {
      if (!user) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else {
        res.status(STATUS_500).send({ message: serverError });
      }
    });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !validator.isEmail(email) || !password) {
    res.status(STATUS_400).send({ message: notValidEmailOrPassword });
    return;
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        res.status(STATUS_404).send({ message: notValidEmailOrPassword });
      } else {
        const token = `Bearer: ${jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: ONE_WEEK })}`;
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: ONE_WEEK_IN_MS,
        }).send({ token });
      }
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
export const getUserInfo = (req: IGetUserAuthInfoRequest, res: Response) => {
  const owner = req.user;
  console.log(1, owner);
  res.send(owner);
};
