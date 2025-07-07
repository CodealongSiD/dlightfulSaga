import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          {/* You can add more routes here like /login, /product/:id etc */}
        </Routes>
      </Router>
    </>
  );
}

export default App
