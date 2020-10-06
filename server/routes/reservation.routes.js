const reservationController = require("../controllers/reservation.controller");
const ReservationController = require("../controllers/reservation.controller");

module.exports = app => {
    app.get("/api/reservations", ReservationController.getAllReservation);
    app.get("/api/reservation/:id", ReservationController.getReservation);
    app.post("/api/reservation/new", ReservationController.createReservation);
    app.put("/api/reservation/update/:id", ReservationController.updateReservation);
    app.delete("/api/reservation/delete/:id", ReservationController.deleteReservation);
}