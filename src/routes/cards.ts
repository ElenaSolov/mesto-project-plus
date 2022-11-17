import { Router } from 'express';
import {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} from '../controllers/cards';
import validateCardData from '../validators/validateCardData';
import validateId from '../validators/validateId';

const router = Router();

router.get('/', getCards);
router.post('/', validateCardData, createCard);
router.delete('/:id', validateId, deleteCard);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

export default router;
