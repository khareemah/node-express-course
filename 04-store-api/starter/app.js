const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');

const productsRouter = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use('/api/v1/products', productsRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
