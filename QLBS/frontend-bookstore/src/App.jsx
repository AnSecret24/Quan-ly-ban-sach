import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";

import AdminPage from "./pages/AdminPage";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>

        {/* USER LAYOUT */}
        <Route element={<UserLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sach/:id" element={<BookDetail />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* ADMIN LAYOUT */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route index element={<AdminPage />} />
          <Route path="orders" element={<AdminOrders />} />

        </Route>

        {/* Sai URL */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default App;