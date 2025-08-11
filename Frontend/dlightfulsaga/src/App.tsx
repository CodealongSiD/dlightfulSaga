import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import Footer from "@/layout/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
