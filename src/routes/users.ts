import { Router } from 'express';
import {
  getUserById, getUserInfo, getUsers, updateUserAvatar, updateUserProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', getUserById);
router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

export default router;
