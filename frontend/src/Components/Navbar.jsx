import React, { useState, useEffect } from "react";
import { motion, useScroll, useAnimation } from "framer-motion";
import { HeartPulse, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 50) {
        controls.start("scroll");
      } else {
        controls.start("top");
      }
    });
  }, [scrollY, controls]);

  const navVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
    },
    scroll: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/market" },
    { name: "About", href: "/about" },
    { name: "Support", href: "/support" },
  ];

  return (
    <motion.nav
      initial="top"
      animate={controls}
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className="fixed w-full z-50 py-4 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <HeartPulse className="h-8 w-8 text-sky-500" />
            <span className="text-xl font-bold text-sky-900">MedExchange</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sky-900 hover:text-sky-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <SignedOut>
              <SignInButton className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors" />
            </SignedOut>
            
      <SignedIn>
        <UserButton />
      </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sky-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sky-900 hover:text-sky-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/signin" 
              className="block w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
      
    </motion.nav>
    
  );
}

export default Navbar;