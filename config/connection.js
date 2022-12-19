const { connect, connection } = require('mongoose');

// Set up used to add a link between the MongoDB database and the program
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmediaDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
