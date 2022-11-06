import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { uri, DEFAULT_PORT } from './constants';
import addUserToRequest from './middleware/addUserToRequest';
import { createUser, login } from './controllers/users';

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

async function run() {
  await mongoose.connect(uri);
}
run().then(() => app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}))
  .catch((err) => console.log(err));

app.use('/', addUserToRequest);
app.use(express.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.post('/signin', login);
app.post('/signup', createUser);

app.get('/', (req, res) => {
  res.send('Mesto App');
});
