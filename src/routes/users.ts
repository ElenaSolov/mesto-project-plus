import { Router } from 'express';
import {
  getUserById, getUserInfo, getUsers, updateUserAvatar, updateUserProfile,
} from '../controllers/users';
import { validateIdJoi } from '../validators/validateId';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', validateIdJoi, getUserById);
router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

export default router;
