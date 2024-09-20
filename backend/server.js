const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bookingSchema = require('./schema/schema');  // Import the updated schema
const bookingResolver = require('./resolvers/resolvers');
const cors = require('cors');
const sequelize = require('./model/model').sequelize;
require('dotenv').config();


const app = express();

// Enable CORS
app.use(cors());

// Authenticate and sync the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced successfully');

    // Set up /graphql endpoint using graphqlHTTP middleware
    app.use('/graphql', graphqlHTTP({
      schema: bookingSchema,
      rootValue: bookingResolver,
      graphiql: true,  // Enable GraphiQL UI for testing
    }));

    // Simple route for testing server
    app.get('/hi', (req, res) => {
      res.send('Hello, world');
    });

    // Start the server
    app.listen(4000, () => {
      console.log('Server running at http://localhost:4000/graphql');
    });
  })
  .catch(err => {
    console.error('Unable to connect to or sync the database:', err);
  });
