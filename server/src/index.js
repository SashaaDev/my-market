require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const {dbConfig} = require('./config/dbConfig');
const router = require('./routes/router');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined');
  process.exit(1);
}

if (!process.env.DB_NAME) {
  console.error('DB_NAME is not defined');
  process.exit(1);
}

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(dbConfig.uri, dbConfig.options)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      console.error('URI:', dbConfig.uri);
      console.error('Options:', dbConfig.options);
    });


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
