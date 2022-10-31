import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { uri } from './constants';
import addUserToRequest from './middleware/addUserToRequest';

const { PORT = 3000 } = process.env;
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
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.get('/', (req, res) => {
  res.status(200).send('Mesto App');
});
