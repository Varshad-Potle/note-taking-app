const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: { // changed from 'User' to 'user'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General"
  },
  date: { // optional: change to lowercase for consistency
    type: Date,
    default: Date.now
  }  
});

module.exports = mongoose.model("Note", NoteSchema);
