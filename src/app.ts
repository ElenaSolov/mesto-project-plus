import express from 'express';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
const app = express();
mongoose
  .connect('mongodb://localhost:27017/mestodb ')
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
