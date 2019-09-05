const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow Cross-Origin requests
app.use(cors());

const URL = 'mongodb+srv://admin:admin1234@gql-tutorial-erbks.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(URL, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('Conected to database')
})

var x = mongoose.Types.ObjectId()

console.log('log',x)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});