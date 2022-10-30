import express from 'express';
import mongoose from 'mongoose';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();


app.get('/', (req, res)=> {
  res.status(200).send('Mesto App');
})
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
