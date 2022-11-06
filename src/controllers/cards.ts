import { Request, Response } from 'express';
import Card from '../models/card';
import User from '../models/user';
import {
  cardIdNotProvided, cardNotFound,
  CAST_ERROR,
  nameOrLinkNotProvided,
  STATUS_204, STATUS_400, STATUS_404, STATUS_500, userIdNotFound,
  userIdNotProvided, VALIDATION_ERROR,
} from '../constants';

export const getCards = async (req: Request, res: Response) => {
  await Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => res.status(STATUS_500).send(err));
};

export const createCard = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userId = req.user._id;
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(STATUS_400).send({ message: nameOrLinkNotProvided });
    return;
  }
  User.findById(userId)
    .then((owner) => Card.create({
      name,
      link,
      owner,
    }))
    .then((card) => res.status(201).send({ name: card.name, link: card.link }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(STATUS_404).send({ message: userIdNotFound });
      } else if (err.name === VALIDATION_ERROR) {
        res.status(STATUS_400).send({ message: err.message });
      } else {
        res.status(STATUS_500).send({ message: err });
      }
    });
};

export const deleteCard = (req:Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_400).send({ message: cardIdNotProvided });
  }
  Card.findByIdAndDelete(id)
    .then(() => res.status(STATUS_204).send())
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(STATUS_400).send({ message: cardNotFound });
      } else {
        res.status(STATUS_500).send({ message: err });
      }
    });
};

export const likeCard = (req:Request, res: Response) => {
  const { cardId } = req.params;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ownerId = req.user._id;
  if (!ownerId) {
    res.status(STATUS_400).send({ message: userIdNotProvided });
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: ownerId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ name: card?.name, link: card?.link, likes: card?.likes }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(STATUS_400).send({ message: cardNotFound });
      } else {
        res.status(STATUS_500).send({ message: err });
      }
    });
};

export const dislikeCard = async (req:Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res
    .send({ name: card?.name, link: card?.link, likes: card?.likes }))
  .catch((err) => {
    if (err.name === CAST_ERROR) {
      res.status(STATUS_400).send({ message: cardNotFound });
    } else {
      res.status(STATUS_500).send({ message: err });
    }
  });
