const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");


const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate user input 
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        // Check for existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });

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

        const user = await User.findOne({ email });
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
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                },
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
        const adminUser = await User.findOne({ isAdmin: true });
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
        await User.findByIdAndUpdate(adminUser._id, { notification });
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

module.exports = { loginController, registerController, authController, applyDoctorController, getAllDoctorsController };
