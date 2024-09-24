const Booking = require('../model/model').Booking;
const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables from .env

// Create a transporter for Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',  // SMTP host for Outlook
  port: 587,                      // SMTP port for Outlook
  secure: false,                   // true for 465, false for other ports
  auth: {
    user: process.env.ADMIN_MAIL,  // Your Outlook email address
    pass: process.env.EMAIL_PASS,  // Your Outlook email password or app password
  },
  tls: {
    ciphers: 'SSLv3'  // Optional: helps with certain Outlook servers
  }
});

console.log('OUTLOOK_USER:', process.env.ADMIN_MAIL);
console.log('OUTLOOK_PASS:', process.env.EMAIL_PASS);

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
  
      // Check if the user already exists to apply a 10% discount
      const userExists = await Booking.findOne({ where: { email: args.email } });
      if (userExists) {
        discount = 10;  // Apply 10% discount if the user exists
      }
  
      // Create a new booking in the database
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
        amount: args.amount - (args.amount * (discount / 100))  // Apply discount to total amount
      });
  
      // Prepare and send the email
      const userMailOptions = {
        from: `Appointment Service <${process.env.ADMIN_MAIL}>`,
        to: args.email,
        subject: 'Appointment Confirmation',
        text: `Hi ${args.name}, your appointment for ${args.serviceName} is confirmed on ${args.bookingDate}.`,
        html: `...`, // As per your HTML email template
      };
  
      const info = await transporter.sendMail(userMailOptions);
      console.log('Email sent to user:', info.response);
  
      return newBooking;
    } catch (error) {
      console.error('Error adding booking and sending email:', error);  // Log full error object
      throw new Error('Error adding booking and sending email');
    }
  }
  
};

module.exports = rootResolver;


/* const Booking = require('../model/model').Booking;
const nodemailer = require('nodemailer');
require('dotenv').config();  // Make sure to load environment variables from .env

// Create a transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('ADMIN_MAIL:', process.env.ADMIN_MAIL);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);


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

      // Check if the user already exists to apply a 10% discount
      const userExists = await Booking.findOne({ where: { email: args.email } });
      if (userExists) {
        discount = 10;  // Apply 10% discount if the user exists
      }

      // Create a new booking in the database
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
        amount: args.amount - (args.amount * (discount / 100))  // Apply discount to total amount
      });

      // Prepare the email options for the user
      const userMailOptions = {
        from: `Appointment Service <${process.env.ADMIN_MAIL}>`,  // Sender address (Gmail)
        to: args.email,  // Recipient address (user)
        subject: 'Appointment Confirmation',
        text: `Hi ${args.name}, your appointment for ${args.serviceName} is confirmed on ${args.bookingDate}.`,
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Dear <strong>${args.name}</strong>,</p>
          <p>Your appointment for the <strong>${args.serviceName}</strong> service has been confirmed on <strong>${args.bookingDate}</strong> between <strong>${args.bookingStart}</strong> and <strong>${args.bookingEnd}</strong>.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li>Service: ${args.serviceName}</li>
            <li>Service Price: $${args.servicePrice} per m²</li>
            <li>Total Area: ${args.totalArea} m²</li>
            <li>Discount: ${discount}%</li>
            <li>Total Amount: $${(args.amount - (args.amount * (discount / 100))).toFixed(2)}</li>
          </ul>
          <p>Thank you for choosing our service!</p>
        `,
      };

      console.log('Sending email with the following options:', userMailOptions);

      // Send the email to the user
      const info = await transporter.sendMail(userMailOptions);
      console.log('Email sent to user:', info.response);

      return newBooking;
    } catch (error) {
      console.error('Error adding booking and sending email:', error.message, error.stack);
      throw new Error('Error adding booking and sending email');
    
    }
  }
};

module.exports = rootResolver;

 */