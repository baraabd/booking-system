const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',  // Path to SQLite database file
});

const Booking = sequelize.define('Booking', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    bookingStart: { type: DataTypes.STRING, allowNull: false },
    bookingEnd: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false  // Disable createdAt and updatedAt
});

sequelize.sync();  // Sync the model with the database

module.exports = { Booking, sequelize };
