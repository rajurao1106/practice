import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
});

const User = mongoose.models.folders || mongoose.model('folders', userSchema);

export default User;
