const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  getAllAppointmentsController,
  changeAccountStatusController,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//GET METHOD || APPOINTMENTS
router.get("/get-all-appointments", authMiddleware, getAllAppointmentsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
