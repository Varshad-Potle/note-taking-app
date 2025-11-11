const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// ensure kiya ki email unique ho
UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
