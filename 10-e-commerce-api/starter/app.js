require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('tiny'));
app.use(cors());
// app.use(express.static('./public'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.get('/api/v1', (req, res) => {
  // console.log(req.signedCookies.token);
  res.status(200).send('Hello');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
