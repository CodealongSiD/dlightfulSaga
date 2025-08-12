import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import Footer from "@/layout/Footer";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Footer />
    </Router>
  );
}

export default App;
