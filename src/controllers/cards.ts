import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  messageCardNotFound,
  messageNameOrLinkNotProvided, messageNoRights,
  STATUS_204, messageUserIdNotProvided, STATUS_201, messageNotValidId,
} from '../constants';
import { IRequestWithAuth } from '../types';
import { validateIdMongoose } from '../validators/validateId';

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
  if (!name || !link) {
    next(messageNameOrLinkNotProvided);
  }
  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => res.status(STATUS_201)
      .send(card))
    .catch(next);
};

export const deleteCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const ownerId = req.user?._id;
  const { id } = req.params;
  if (!validateIdMongoose(id)) return next(messageNotValidId);
  Card.findOne({ _id: id })
    .then((card) => {
      if (!card) {
        next(messageCardNotFound);
      } else if (card.owner.toString() !== ownerId) {
        next(messageNoRights);
      } else {
        Card.deleteOne({ _id: card.id })
          .then(() => res.status(STATUS_204).send())
          .catch(next);
      }
    })
    .catch(next);
};

export const likeCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!validateIdMongoose(cardId)) return next(messageNotValidId);
  const ownerId = req.user?._id;
  if (!ownerId) {
    next(messageUserIdNotProvided);
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: ownerId } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        next(messageCardNotFound);
      } else {
        res.send({ name: card.name, link: card.link, likes: card.likes });
      }
    })
    .catch(next);
};

export const dislikeCard = (req:IRequestWithAuth, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!validateIdMongoose(cardId)) return next(messageNotValidId);
  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user?._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        next(messageCardNotFound);
      } else {
        res.send({ name: card.name, link: card.link, likes: card.likes });
      }
    })
    .catch(next);
};
