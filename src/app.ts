import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000 } = process.env;
const app = express();

// app.use(express.json());

const uri = 'mongodb+srv://seaver:UMk88Df44p0dGH6c@cluster0.qf2ysmc.mongodb.net/?retryWrites=true&w=majority';

async function run() {
  // 4. Connect to MongoDB
  await mongoose.connect(uri);
}
run().then(() => app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  // @ts-ignore
  req.user = {
    _id: '635e64d7e2b2841dd47bdf1c',
  };

  next();
});
app.use(express.json());
app.use('/', usersRouter);

app.use('/', cardsRouter);

app.get('/', (req, res) => {
  res.status(200).send('Mesto App');
});
