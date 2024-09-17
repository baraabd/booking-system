const Booking = require('../model/model').Booking;

const rootResolver = {
  listBookings: async () => {
    try {
      const bookings = await Booking.findAll();
      return bookings;
    } catch (error) {
      throw new Error('Error fetching bookings');
    }
  },
  checkUserExists: async ({ email }) => {
    try {
      const user = await Booking.findOne({ where: { email } });
      return user ? true : false;
    } catch (error) {
      throw new Error('Error checking user');
    }
  },
  addBooking: async (args) => {
    try {
      let discount = args.discount;

      // Check if the user already exists to apply 10% discount
      const userExists = await Booking.findOne({ where: { email: args.email } });
      if (userExists) {
        discount = 10; // Apply 10% discount
      }

      const newBooking = await Booking.create({
        name: args.name,
        email: args.email,
        phone: args.phone,
        address: args.address,
        postalCode: args.postalCode,
        bookingDate: args.bookingDate,
        bookingStart: args.bookingStart,
        bookingEnd: args.bookingEnd,
        serviceName: args.serviceName,
        servicePrice: args.servicePrice,
        totalArea: args.totalArea,
        discount: discount,
        amount: args.amount - (args.amount * (discount / 100)) // Apply discount to total amount
      });

      return newBooking;
    } catch (error) {
      throw new Error('Error adding booking');
    }
  }
};

module.exports = rootResolver;
