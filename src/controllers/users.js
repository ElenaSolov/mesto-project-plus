import user from "../models/user";
import bcrypt from "bcrypt";

export const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      user.create({
        name: req.body.name,
        email: req.body.email,
        about: req.body.about,
        password: hash,
      })
    )
    .then((user) => res.status(201).send({name: user.name, email: user.email}))
    .catch((err) => res.status(400).send(err));
};
