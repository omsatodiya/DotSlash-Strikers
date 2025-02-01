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
function App() {
  const { isSignedIn } = useUser();


  return (
    <div>
      {/* <h1>Welcome to My App</h1> */}
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
