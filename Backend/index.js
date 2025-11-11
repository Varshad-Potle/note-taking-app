const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/notebook_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // allows all origins to access the server
app.use(express.json()); // VERY IMPORTANT: allows req.body to be parsed

const authRouter = require('./routes/auth'); // path correct?
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);
app.use('/api/auth', authRouter); //  POST routes are /api/auth/createUser & /api/auth/login

app.listen(5000, () => {
  console.log('notebook app backend started on port 5000');
});
