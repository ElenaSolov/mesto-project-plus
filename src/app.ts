import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { uri, DEFAULT_PORT } from './constants';
import { createUser, login } from './controllers/users';
import auth from './middleware/auth';
import { requestLogger, errorLogger } from './middleware/logger';
import handleErrors from './middleware/handleErrors';

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

async function run() {
  await mongoose.connect(uri);
}
run().then(() => app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}))
  .catch((err) => console.log(err));

app.use(requestLogger);
app.use(express.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth as express.RequestHandler);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);
app.use(handleErrors);

app.get('/', (req, res) => {
  res.send('Mesto App');
});
