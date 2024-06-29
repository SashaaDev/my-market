require('dotenv').config()

module.exports.dbConfig = {
  uri: process.env.MONGO_URI,
  options: {
    dbName: process.env.DB_NAME,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000.
  }
}