import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import validateUserInfo from './validators/validateUserInfo';
import validateCredentials from './validators/validateCredentials';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { uri, DEFAULT_PORT, messageNoContentFound } from './constants';
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
app.use(cookieParser());
app.use(express.json());
app.post('/signup', validateCredentials, validateUserInfo, createUser);
app.post('/signin', validateCredentials, login);
app.use(auth as express.RequestHandler);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res, next) => {
  next(messageNoContentFound);
});
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.get('/', (req, res) => {
  res.send('Mesto App');
});
