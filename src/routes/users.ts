import { Router } from 'express';
import {
  createUser, getUserById, getUsers, login, updateUserAvatar, updateUserProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', login);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;
