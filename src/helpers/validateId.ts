import mongoose from 'mongoose';

export default (id: string) => mongoose.Types.ObjectId.isValid(id);
