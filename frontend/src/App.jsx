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
import { Route , Routes , BrowserRouter } from "react-router-dom";
function App() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
      </Routes>
      <Footer/>
      {/* <h1>Welcome to My App</h1> */}

    </div>
  );
}

export default App;
