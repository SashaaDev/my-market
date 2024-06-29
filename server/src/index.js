require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const { dbConfig } = require('./config/dbConfig');
const router = require('./routes/router');

const port = process.env.PORT || 5000;

mongoose
    .connect(dbConfig.uri, dbConfig.options)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
