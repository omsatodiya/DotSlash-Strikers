import {
  SignIn,
  SignUp,
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Market from "./Pages/Market";
import { useState, useEffect } from "react";
import { Route , Routes , BrowserRouter } from "react-router-dom";
import Emergency from "./Pages/Emergency";
function App() {
  const { isSignedIn } = useUser();

  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch("http://localhost:5000/api/hospital")
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response wasn't ok");
        }
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        setHospitalData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>loading</>;
  }

  return (
    <div>
      <Navbar />
      {console.log(hospitalData)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
      <Footer />
      {/* <h1>Welcome to My App</h1> */}
    </div>
  );
}

export default App;
