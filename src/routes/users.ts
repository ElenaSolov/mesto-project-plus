import { Router } from 'express';
import {
  getUserById, getUserInfo, getUsers, updateUserAvatar, updateUserProfile,
} from '../controllers/users';
import validateId from '../validators/validateId';
import validateUserInfo from '../validators/validateUserInfo';
import validateAvatar from '../validators/validateAvatar';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUserInfo, updateUserProfile);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

export default router;
