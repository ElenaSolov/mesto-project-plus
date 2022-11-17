import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {
  messageUserIdNotFound,
  messageServerError,
  messageNotValidEmailOrPassword, ONE_WEEK, ONE_WEEK_IN_MS,
  jwtsecret, messageNeedAuthorization, messageUserCreated,
  VALIDATION_ERROR, messageUserAlreadyExist, CAST_ERROR,
} from '../constants';
import { IRequestWithAuth } from '../types';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import UserExistsError from '../errors/UserExistsError';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.init()
      .then(() => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => {
        if (!user) {
          throw new Error(messageServerError);
        }
        res.status(201)
          .send({ message: messageUserCreated, user: user.name, email: user.email });
      }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new UserExistsError(messageUserAlreadyExist));
      } else next(err);
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  User.findUserById(id).then((user) => {
    if (!user) {
      throw new NotFoundError(messageUserIdNotFound);
    } else {
      res.send(user);
    }
  })
    .catch(next);
};

export const updateUserProfile = (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  }).exec()
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageUserIdNotFound);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

export const updateUserAvatar = (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  }).exec()
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageUserIdNotFound);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequestError(messageNotValidEmailOrPassword);
      } else {
        const token = jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: ONE_WEEK });
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: ONE_WEEK_IN_MS,
        }).send({ token });
      }
    })
    .catch(next);
};
export const getUserInfo = (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const owner = req.user;
  if (owner) {
    User.findUserById(owner._id)
      .then((user) => {
        if (!user) {
          throw new BadRequestError(messageNotValidEmailOrPassword);
        } else {
          res.send(user);
        }
      })
      .catch((err) => {
        if (err.name === CAST_ERROR) {
          next(new NotFoundError(messageUserIdNotFound));
        }
        if (err.name === VALIDATION_ERROR) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      });
  } else {
    next(messageNeedAuthorization);
  }
};
