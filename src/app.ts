import express from 'express';
import mongoose from 'mongoose';

// Слушаем 3000 порт
const { PORT = 4000 } = process.env;
const uri = 'mongodb+srv://seaver:50f6Y2YYrbkmpQcj@cluster0.qf2ysmc.mongodb.net/?retryWrites=true&w=majority';
const app = express();
mongoose
  .connect(uri)
  .then(() => app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  }))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.status(200).send('Mesto App');
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
