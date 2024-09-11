const { buildSchema } = require('graphql');

const schema = buildSchema(`
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
    bookingStart: String
    bookingEnd: String
  }

  type Mutation {
    addBooking(
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String!, 
      postalCode: String!,
      bookingStart: String!,
      bookingEnd: String!
    ): Booking
  }
`);

module.exports = schema;
