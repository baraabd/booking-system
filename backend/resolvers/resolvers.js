const Booking = require('../model/model');

// Define resolvers for the Query and Mutation types
const resolvers = {
  Query: {
    listBookings: async () => {
      try {
        return await Boo.findAll();  // Sequelize method to find all records
      } catch (error) {
        console.error("Error fetching bookings:", error);
        throw new Error("Error fetching bookings");
      }
    }
  },
  Mutation: {
    addBooking: async (_, args) => {
      try {
        const newBooking = await Booking.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
          address: args.address,
          postalCode: args.postalCode
        });
        return newBooking;
      } catch (error) {
        console.error("Error adding booking:", error);
        throw new Error("Error adding booking");
      }
    }
  }
};

module.exports = resolvers;
