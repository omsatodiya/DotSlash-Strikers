import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Market from "./Pages/Market";
import Emergency from "./Pages/Emergency";
import Dashboard from "./Pages/Dashboard";
import AddItemForm from "./Components/AddItem";
import AboutUs from "./Pages/About";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/add-item" element={<AddItemForm />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
