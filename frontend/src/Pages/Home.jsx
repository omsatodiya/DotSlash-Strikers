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
import { Link } from "react-router-dom";

// Button Component
const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
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
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
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

// Animations
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
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="flex flex-col min-h-screen">
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
              supplies and equipment efficiently.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/emergency">
                <Button
                  size="lg"
                  className="border-red-700 text-red-800 hover:bg-red-200 transform hover:scale-105 transition-all"
                >
                  Emergency
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-sky-400 hover:bg-sky-500 text-white transform hover:scale-105 transition-all"
                >
                  Dashboard
                  <MapPin className="ml-2 w-4 h-4" />
                </Button>
              </Link>
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
            {[
              {
                icon: <Building2 className="w-16 h-16 text-sky-500 mb-6" />,
                title: "Register Your Hospital",
                text: "Create an account and verify your hospital's credentials.",
              },
              {
                icon: <MapPin className="w-16 h-16 text-sky-500 mb-6" />,
                title: "Find Nearby Resources",
                text: "Locate hospitals nearby that have the supplies you need.",
              },
              {
                icon: <HandshakeIcon className="w-16 h-16 text-sky-500 mb-6" />,
                title: "Exchange Supplies",
                text: "Securely exchange supplies with verified facilities.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                className="flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {item.icon}
                <h3 className="text-2xl font-semibold mb-4 text-sky-900">{item.title}</h3>
                <p className="text-sky-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-white" ref={ref2}>
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
            {[
              {
                icon: <ShieldCheck className="w-12 h-12 text-sky-500 flex-shrink-0" />,
                title: "Verified Network",
                text: "All participating hospitals are verified for trust and safety.",
              },
              {
                icon: <Clock className="w-12 h-12 text-sky-500 flex-shrink-0" />,
                title: "Quick Response",
                text: "Get immediate access to supplies during emergencies.",
              },
              {
                icon: <Globe2 className="w-12 h-12 text-sky-500 flex-shrink-0" />,
                title: "Global Network",
                text: "Connect with facilities worldwide, not just nearby.",
              },
              {
                icon: <HeartHandshake className="w-12 h-12 text-sky-500 flex-shrink-0" />,
                title: "Community Support",
                text: "A network built on collaboration and shared purpose.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                className="flex items-start space-x-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {item.icon}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-sky-900">{item.title}</h3>
                  <p className="text-sky-700">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
