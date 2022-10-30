import bcrypt from 'bcrypt';
import user from '../models/user';

 const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => user.create({
      name: req.body.name,
      email: req.body.email,
      about: req.body.about,
      password: hash,
    }))
    .then((newUser) => res.status(201).send({ name: newUser.name, email: newUser.email }))
    .catch((err) => res.status(400).send(err));
};
