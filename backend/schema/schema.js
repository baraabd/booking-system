const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    listBookings: [Booking]
  }

  type Booking {
    id: ID
    name: String
    email: String
    phone: String
    address: String
    postalCode: String
  }

  type Mutation {
    addBooking(
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String!, 
      postalCode: String!
    ): Booking
  }
`;

module.exports = typeDefs;
