import { Request, Response } from 'express';
import Card from '../models/card';
import User from '../models/user';
import {
  STATUS_200, STATUS_204, STATUS_400, STATUS_500,
} from '../constants';

export const getCards = async (req: Request, res: Response) => {
  await Card.find({})
    .then((cards) => {
      res.status(STATUS_200).send(cards);
    })
    .catch((err) => res.status(STATUS_500).send(err));
};

export const createCard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;
  const owner = await User.findById(userId);
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(STATUS_400).send({ message: 'Name and link should be provided for new card' });
    return;
  }
  await Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(201).send({ name: card.name, link: card.link }))
    .catch((err) => res.status(STATUS_500).send(err));
};

export const deleteCard = async (req:Request, res: Response) => {
  const { id } = req.params;
  await Card.findByIdAndRemove(id)
    .then(() => res.status(STATUS_204).send())
    .catch(() => res.status(STATUS_500).send({ message: 'Карточка не найдена' }));
};

export const likeCard = async (req:Request, res: Response) => {
  const { cardId } = req.params;
  await Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.status(STATUS_200)
      // @ts-ignore
      .send({ name: card.name, link: card.link, likes: card.likes }))
    .catch(() => res.status(STATUS_400).send({ message: 'Карточка не найдена' }));
};

export const dislikeCard = async (req:Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  // @ts-ignore
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(STATUS_200)
    // @ts-ignore
    .send({ name: card.name, link: card.link, likes: card.likes }))
  .catch(() => res.status(STATUS_400).send({ message: 'Карточка не найдена' }));
