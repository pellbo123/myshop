const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pellbo:1234@mrlee.3vgxygk.mongodb.net/?retryWrites=true&w=majority&appName=Mrlee')
    } catch (error) {
        throw new Error("Connection Failed!");
    }
};
module.exports = connectDB;