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
    bookingDate: { type: DataTypes.STRING, allowNull: false },
    bookingStart: { type: DataTypes.STRING, allowNull: false },
    bookingEnd: { type: DataTypes.STRING, allowNull: false },
    serviceName: { type: DataTypes.STRING, allowNull: false },
    pricePerSquareMeter: { type: DataTypes.FLOAT, allowNull: false },  
    totalArea: { type: DataTypes.FLOAT, allowNull: false },     
    discount: { type: DataTypes.FLOAT, allowNull: false },      
    amount: { type: DataTypes.FLOAT, allowNull: false }     

}, {
    timestamps: false  // Disable createdAt and updatedAt
});

sequelize.sync();  // Sync the model with the database

module.exports = { Booking, sequelize };