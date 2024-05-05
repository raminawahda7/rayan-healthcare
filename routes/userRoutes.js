const express = require("express");
const {
    loginController,
    registerController,
} = require("../controllers/userController");

//router
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);
module.exports = router;