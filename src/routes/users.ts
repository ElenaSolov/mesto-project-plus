import { Router, Request, Response } from 'express';
import User from '../models/user';
import createUser from '../controllers/users';

// [{"_id":"635e4b11541f2e456422e8a1","name":"Bill","about":"bill@initech.com","avatar":"https://i.imgur.com/dM7Thhn.png","__v":0},{"_id":"635e4c46b3b6721a4e6a7c39","name":"Bill","about":"bill@initech.com","avatar":"https://i.imgur.com/dM7Thhn.png","__v":0},{"_id":"635e4cabdcdc287d424a9855","name":"Bill","about":"bill@initech.com","avatar":"https://i.imgur.com/dM7Thhn.png","__v":0},{"_id":"635e524e989ff3f476d10c21","name":"Bill","about":"bill@initech.com","avatar":"https://i.imgur.com/dM7Thhn.png","__v":0}]
const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  await User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => console.log(err));
});

router.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.params.id);
  await User.findById(id).exec()
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ error: 'Пользователь не найден' }));
});

router.post('/users', createUser);

export default router;
