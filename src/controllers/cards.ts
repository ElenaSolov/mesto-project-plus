import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = async (req: Request, res: Response) => {
  await Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => console.log(err));
};

export const createCard = async (req: Request, res: Response) => {
  await Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.body.owner,
  })
    .then((card) => res.status(201).send({ name: card.name, link: card.link }))
    .catch((err) => res.status(400).send(err));
};

export const deleteCard = async (req:Request, res: Response) => {
  const { id } = req.params;
  await Card.findByIdAndRemove(id)
    .then(() => res.status(204).send(`Card with id ${id} was successfully deleted`))
    .catch((err) => res.status(400).send(err))

};
