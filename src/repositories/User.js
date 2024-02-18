import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'user' },
  likes: { type: Array, required: true, default: [] },
  playLists: { type: Array, default: [], required: true },
});

export default Mongoose.model('User', userSchema);
