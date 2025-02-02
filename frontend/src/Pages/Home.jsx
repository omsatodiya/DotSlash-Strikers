"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Building2,
  Clock,
  HandshakeIcon,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Globe2,
  HeartHandshake,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

// Button Component Implementation
const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClass = buttonVariants[variant];
    const sizeClass = buttonSizes[size];
    const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`;

    return (
      <button className={combinedClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const getCurrentLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Failed to get location. Please enter coordinates manually."
          );
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  };


export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-100 via-blue-50 to-white py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200/30 to-blue-200/30" />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <HeartPulse className="w-20 h-20 text-sky-500 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-sky-900">
              Connecting Hospitals, <br />
              <span className="text-sky-500">Saving Lives</span>
            </h1>
            <p className="text-xl text-sky-700 max-w-2xl">
              A revolutionary platform enabling hospitals to exchange medical
              supplies and equipment efficiently, ensuring critical resources
              reach where they're needed most.
            </p>
            <div className="flex gap-4 mt-8">
              {!isSignedIn ? (
                <>
                  {/* <SignInButton mode="modal">
                    <Button
                      size="lg"
                      className="bg-sky-300 hover:bg-sky-400 transform hover:scale-105 transition-all"
                    >
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </SignInButton> */}

                  <SignUpButton redirectUrl="/hospital-form">
                    <Button
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all"
                    >
                      Register Hospital
                      <Building2 className="ml-2 w-4 h-4" />
                    </Button>
                  </SignUpButton>
                </>
              ) : (
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-sky-300 hover:bg-sky-400 transform hover:scale-105 transition-all"
                  >
                    Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}

              <Button
                size="lg"
                variant="outline"
                className="border-red-700 text-red-800 hover:bg-red-200 hover:cursor-pointer transform hover:scale-105 transition-all"
              >
                Emergency Call
              </Button>
              {/* <Link to="/hospital-form">
                <Button
                  size="lg"
                  className="bg-sky-300 hover:bg-sky-400 transform hover:scale-105 transition-all"
                >
                  Form
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white" ref={ref1}>
        <motion.div
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto max-w-6xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16 text-sky-900"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Building2 className="w-16 h-16 text-sky-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                Register Your Hospital
              </h3>
              <p className="text-sky-700">
                Create an account and verify your hospital's credentials to join
                our network.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <MapPin className="w-16 h-16 text-sky-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                Find Nearby Resources
              </h3>
              <p className="text-sky-700">
                Easily locate and connect with hospitals in your vicinity that
                have the supplies you need.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <HandshakeIcon className="w-16 h-16 text-sky-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                Exchange Supplies
              </h3>
              <p className="text-sky-700">
                Securely exchange medical supplies and equipment with verified
                healthcare facilities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section
        className="py-20 px-4 bg-gradient-to-br from-sky-50 to-white"
        ref={ref2}
      >
        <motion.div
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto max-w-6xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16 text-sky-900"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={cardVariant}
              className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <ShieldCheck className="w-12 h-12 text-sky-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                  Verified Network
                </h3>
                <p className="text-sky-700">
                  All participating hospitals are thoroughly verified to ensure
                  a trusted network of healthcare providers.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Clock className="w-12 h-12 text-sky-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                  Quick Response
                </h3>
                <p className="text-sky-700">
                  Get immediate access to needed supplies during emergencies
                  through our efficient platform.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Globe2 className="w-12 h-12 text-sky-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                  Global Network
                </h3>
                <p className="text-sky-700">
                  Connect with healthcare facilities worldwide, expanding your
                  resource network beyond geographical boundaries.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <HeartHandshake className="w-12 h-12 text-sky-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-sky-900">
                  Community Support
                </h3>
                <p className="text-sky-700">
                  Join a supportive community of healthcare providers committed
                  to helping each other save lives.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
