const Reservation = require('../models/reservation.model')

module.exports = {
    getAllReservation : (req, res) => {
        Reservation.find()
        .then(allReservation => res.json({reservation: allReservation}))
        .catch(err => res.json({message: "There is an error for getting all reservation", error: err}))
    },
    getReservation : (req, res) => {
        Reservation.findById(req.params.id)
        .then(reservation => res.json(reservation))
        .catch(err => res.json({message: "There is an error for getting reservation", error: err}))
    },
    createReservation : (req, res) => {
        Reservation.create(req.body)
        .then(newReservation => res.json(newReservation))
        .catch(err => res.json({message: "There is an error for creating reservation", error: err}))
    },
    updateReservation : (req, res) => {
        Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updatedReservation => res.json(updatedReservation))
        .catch(err => res.json({message: "There is an error for updating reservation", error: err}))
    },
    deleteReservation : (req, res) =>{
        Reservation.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json({ message: "There is an error for deleting reservation", error: err }));
    }
}