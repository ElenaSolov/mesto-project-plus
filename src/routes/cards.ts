import { Router } from 'express';
import { getCards, deleteCard, createCard } from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);

export default router;
