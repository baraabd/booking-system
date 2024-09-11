const Booking = require('../model/model').Booking;

const rootResolver = {
    listBookings: async () => {
        try {
            const bookings = await Booking.findAll();
            console.log('Bookings:', bookings);
            return bookings;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw new Error("Error fetching bookings");
        }
    },
    addBooking: async (args) => {
        try {
            const newBooking = await Booking.create({
                name: args.name,
                email: args.email,
                phone: args.phone,
                address: args.address,
                postalCode: args.postalCode,
                bookingStart: args.bookingStart,
                bookingEnd: args.bookingEnd
            });
            console.log('New booking added:', newBooking);

            return newBooking;
        } catch (error) {
            console.error("Error adding booking:", error);
            throw new Error("Error adding booking");
        }
    }
};

module.exports = rootResolver;
