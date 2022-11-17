import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  messageCardNotFound, STATUS_204, messageUserIdNotProvided,
  STATUS_201, messageServerError, VALIDATION_ERROR, CAST_ERROR,
} from '../constants';
import { IRequestWithAuth } from '../types';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import NoRightsError from '../errors/NoRightsError';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const createCard = (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const ownerId = req.user?._id;
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => {
      if (!card) {
        next(messageServerError);
      } else res.status(STATUS_201).send(card);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const ownerId = req.user?._id;
  const { id } = req.params;
  Card.findOne({ _id: id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageCardNotFound);
      } else if (card.owner.toString() !== ownerId) {
        throw new NoRightsError();
      } else {
        Card.deleteOne({ _id: card.id })
          .then(() => res.status(STATUS_204).send())
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const ownerId = req.user?._id;
  if (!ownerId) {
    throw new BadRequestError(messageUserIdNotProvided);
  }
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: ownerId } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageCardNotFound);
      } else {
        res.send({ name: card.name, link: card.link, likes: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Card
    .findByIdAndUpdate(
      id,
      { $pull: { likes: req.user?._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageCardNotFound);
      } else {
        res.send({ name: card.name, link: card.link, likes: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
