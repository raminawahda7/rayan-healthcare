const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bookAppointmentController, getAllDoctorsController } = require("../controllers/userController");
const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    bookingAvailabilityController,
    userAppointmentsController,
} = require("../controllers/userCtrl");

const router = express.Router();
// Routes

// Login || POST
router.post("/login", loginController);

// Register || POST
router.post("/register", registerController);

// Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification  Doctor || POST
router.post(
    "/get-all-notification",
    authMiddleware,
    getAllNotificationController
);
// Notification  Doctor || POST
router.post(
    "/delete-all-notification",
    authMiddleware,
    deleteAllNotificationController
);

// Get All Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// Book Appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// Booking Availability
router.post(
    "/booking-availbility",
    authMiddleware,
    bookingAvailabilityController
);

// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
