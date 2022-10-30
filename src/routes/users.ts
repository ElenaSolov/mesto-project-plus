import { Router } from 'express';
import {
  createUser, getUserById, getUsers, updateUserAvatar, updateUserProfile,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUserProfile);

router.patch('/users/me/avatar', updateUserAvatar);

export default router;
