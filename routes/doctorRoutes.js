const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  updateStatusController,
  doctorAppointmentsController,
  doctorUserAppointmentsController,
  updateAppointmentController,
} = require("../controllers/doctorController");

// POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

// POST  GET SINGLE DOC INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// GET Appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);
router.post("/getAppointmentById", authMiddleware, doctorUserAppointmentsController);

// UPDATE appointment
router.post("/update-appointment", authMiddleware, updateAppointmentController);

// POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
