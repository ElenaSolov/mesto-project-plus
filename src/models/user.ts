import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  about: {
    type: String,
    required: true,
    minLength: 2
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('user', userSchema);