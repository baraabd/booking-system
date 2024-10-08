const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    listBookings: [Booking]
    checkUserExists(email: String!): Boolean  # Ensure this is added
  }

  type Booking {
    id: ID
    name: String
    email: String
    phone: String
    address: String
    postalCode: String
    bookingDate: String
    bookingStart: String
    bookingEnd: String
    serviceName: String
    pricePerSquareMeter: Float
    totalArea: Float
    discount: Float
    amount: Float
  }

  type Mutation {
    addBooking(
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String!, 
      postalCode: String!,
      bookingDate: String!,
      bookingStart: String!,
      bookingEnd: String!,
      serviceName: String!,
      pricePerSquareMeter: Float!,
      totalArea: Float!,
      discount: Float!,
      amount: Float!,
    ): Booking
  }
`);

module.exports = schema;
