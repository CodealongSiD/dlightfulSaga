import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Add more routes as needed */}
          {/* You can add more routes here like /login, /product/:id etc */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
