const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate user input 
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        // Check for existing user with the same email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });

        // Save user to database
        await newUser.save();
        res.status(201).send({ message: "Register Successfully", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invalid Email or Password", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).send({ message: "Login Success", success: true, token });

    } catch (error) {
        console.error(error);
        res.status.send({ success: false, message: `Error in Login Controller ${error.message}` })
    }
};
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
            error,
        });
    }
};


// Doctor Controller
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: "pending" });
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: "/admin/doctors",
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: "Doctor Account Applied Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Applying For Doctor",
        });
    }
};

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: "approved" });
        res.status(200).send({
            success: true,
            message: "Doctors List Fetched Successfully",
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error WHile Fetching Doctor",
        });
    }
};

// Notification Controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        console.log(user);
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "all notification marked as read",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in notification",
            success: false,
            error,
        });
    }
};

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notifications Deleted successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "unable to delete all notifications",
            error,
        });
    }
};


// Booking Controller
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending";
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: "New-appointment-request",
            message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
            onCLickPath: "/user/appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Book successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointment",
        });
    }
};

const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm")
            .subtract(1, "hours")
            .toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime,
            },
        });
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments not Available at this time",
                success: true,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Appointments available",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Booking",
        });
    }
};

const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({
            userId: req.body.userId,
        });
        res.status(200).send({
            success: true,
            message: "Users Appointments Fetch Successfully",
            data: appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In User Appointments",
        });
    }
};

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllDoctorsController,
    getAllNotificationController,
    deleteAllNotificationController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
};
