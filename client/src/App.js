import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditAppointmentForm from "./components/EditAppointmentForm";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./navigators/ProtectedRoute";
import PublicRoute from "./navigators/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Appointments from "./pages/Appointments";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotificationPage from "./pages/NotificationPage";
import Register from "./pages/Register";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Profile from "./pages/doctor/Profile";
import AllAppointments from "./pages/admin/AllAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute>
                  <AllAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/getAppointmentById/:appointmentId"
              element={
                <ProtectedRoute>
                  <EditAppointmentForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
