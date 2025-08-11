import { Routes, Route } from "react-router-dom";


import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/ProductListPage";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrdersPage from "@/pages/OrdersPage";
import NotFoundPage from "@/pages/NotFoundPage";


function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* Add more routes as needed */}
        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
