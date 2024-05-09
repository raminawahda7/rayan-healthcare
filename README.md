# Doctor Appointment Management (RAYAN HEALTHCARE)

## Introduction

This document provides an overview of the functionalities available in the Doctor Appointment Management System application for different types of users: 
Doctor, User, and Admin (Finance Person). Each user type has specific actions they can perform within the system.
## Live Link:[Rayan-Healthcare](https://rayanhealthcare.onrender.com)
## UML Activity Diagram [Link](https://drive.google.com/file/d/1GYz8nHfZqEKVResAeD5nyhZ0rXQPd4GP/view?usp=sharing)
## Use Cases with related file to these cases

## Doctor

### Functionalities
1. **View Appointments**: Doctors can view their appointments.
2. **Update Profile**: Doctors can update their profile information.
3. **View Doctor List**: Doctors can view a list of other doctors.

### File Locations
- `client` folder contains the front end logic
- `root` contains the server and backend logic
  
## User
### Functionalities
1. **Book Appointment**: Users can book an appointment with a doctor.
2. **View Appointments**: Users can view their appointments.
3. **Apply to be a Doctor**: Users can apply to be a doctor.
4. **Login/Register**: Users can log in or register to the application.

### File Locations
- `controllers/userController.js`: Contains controller functions for booking appointments, viewing appointments, and applying to be a doctor.
- `client/src/pages/ApplyDoctor.js`: For applying to be a doctor.
- `client/src/pages/Login.js` and `client/src/pages/Register.js`: For login and registration.

## Admin (Finance Person)

### Functionalities
1. **View All Doctors**: Admins can view all doctors.
2. **View All Appointments**: Admins can view all appointments.
3. **View All Users**: Admins can view all users.
4. **Update User Information**: Admins can update user information.

### File Locations
- `client/src/pages/admin/Doctors.js`: For viewing all doctors.
- `client/src/pages/admin/AllAppointments.js`: For viewing all appointments.
- `controllers/userController.js`: Contains controller functions for viewing all users and updating user information.

---
This README provides a high-level overview of the functionalities available in the Appointment Management System application and the corresponding file locations for implementing these functionalities.
# How to Run the Application

Follow these steps to run the application:

1. **Clone the repository:**
    Open your terminal and run the following command:
    ```bash
    git clone https://github.com/raminawahda7/rayan-healthcare.git
    ```
2. **Install the dependencies:**
    ```bash
    npm install
    ```
3. **Start the server:**
    ```bash
    npm start
    ```
4. **Navigate to the front end project directory:**
    ```bash
    cd client
    ```
5. **Install the dependencies:**
    ```bash
    npm install
    ```
6. **Start the UI application:**
    ```bash
    npm start
    ```

The application should now be running at `http://localhost:3000`.

## API Endpoints

The application provides the following API endpoint:

- `/api/v1/user`: This endpoint is used for user-related operations.
- `/api/v1/admin`: This endpoint is used for admin-related operations.
- `/api/v1/doctor`: This endpoint is used for doctor-related operations.

- **Stack**
  - **MongoDB**: NoSQL database for storing data
  - **Express**: Backend framework for building RESTful APIs
  - **React**: Frontend framework for building user interfaces
  - **Node.js**: JavaScript runtime environment for building scalable server-side applications
  - **JWT**: JSON Web Token for user authentication and authorization
  - **Bcrypt**: Password hashing library for secure password storage
## Fil Structure:
```
RayanHealthcare:
├── .env
├── .gitignore
├── .vscode/
├── client/
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components/
│       ├── data/
│       ├── index.css
│       ├── index.js
│       ├── navigators/
│       ├── pages/
│       └── redux/
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── doctorController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── appointmentModel.js
│   ├── doctorModel.js
│   └── userModels.js
├── package.json
├── routes/
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── userRoutes.js
└── server.js
```
