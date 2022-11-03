import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { uri, DEFAULT_PORT, STATUS_200 } from './constants';
import addUserToRequest from './middleware/addUserToRequest';
import handleErrors from './middleware/handleErrors';

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

async function run() {
  await mongoose.connect(uri);
}

app.use('/', addUserToRequest);
app.use(express.json());
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', handleErrors);

app.get('/', (req, res) => {
  res.status(STATUS_200).send('Mesto App');
});

run().then(() => app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}))
  .catch((err) => console.log(err));
