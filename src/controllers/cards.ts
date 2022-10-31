import { Request, Response } from 'express';
import Card from '../models/card';
import User from '../models/user';

export const getCards = async (req: Request, res: Response) => {
  await Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => res.status(400).send(err));
};

export const createCard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;
  const owner = await User.findById(userId);
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(400).send({ message: 'Name and link should be provided for new card' });
    return;
  }
  await Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(201).send({ name: card.name, link: card.link }))
    .catch((err) => res.status(400).send(err));
};

export const deleteCard = async (req:Request, res: Response) => {
  const { id } = req.params;
  await Card.findByIdAndRemove(id)
    .then(() => res.status(204).send())
    .catch(() => res.status(400).send({ message: 'Карточка не найдена' }));
};

export const likeCard = async (req:Request, res: Response) => {
  const { cardId } = req.params;
  await Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    // @ts-ignore
    .then((card) => res.status(200).send({ name: card.name, link: card.link, likes: card.likes }))
    .catch(() => res.status(400).send({ message: 'Карточка не найдена' }));
};

export const dislikeCard = async (req:Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  // @ts-ignore
  { $pull: { likes: req.user._id } },
  { new: true },
)
  // @ts-ignore
  .then((card) => res.status(200).send({ name: card.name, link: card.link, likes: card.likes }))
  .catch(() => res.status(400).send({ message: 'Карточка не найдена' }));
