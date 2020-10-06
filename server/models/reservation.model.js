const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    tool:{
        type: String,
        required: true
    },
    customer:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: [true, 'User phone number required']
        }

}, {timestamps: true});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;