import { Router } from 'express';
import {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} from '../controllers/cards';
import validateCardData from '../validators/validateCardData';
import validateCardId from '../validators/validateCardId';

const router = Router();

router.get('/', getCards);
router.post('/', validateCardData, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

export default router;
