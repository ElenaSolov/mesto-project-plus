import { Router, Request, Response } from 'express';
import Card from '../models/card';

const router = Router();

router.get('/cards', async (req: Request, res: Response) => {

});

router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);

export default router;
