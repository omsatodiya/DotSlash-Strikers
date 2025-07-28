"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  HeartPulse,
  ShieldCheck,
  HandshakeIcon,
  Clock,
  MapPin,
  Building2,
  HeartHandshake,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white text-sky-900">

      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <HeartPulse className="w-16 h-16 text-sky-500 mx-auto animate-pulse mb-6" />
          <h1 className="text-5xl font-bold mb-4">About MedShare</h1>
          <p className="text-lg text-sky-700">
            Bridging the gap between patients and hospitals during critical emergencies.
            We enable real-time hospital resource sharing to save more lives.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={cardVariant} className="bg-sky-50 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-sky-700">
              To ensure no life is lost due to delays in accessing medical help by
              providing real-time access to hospitals and enabling emergency supply exchange
              between healthcare providers.
            </p>
          </motion.div>

          <motion.div variants={cardVariant} className="bg-sky-50 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-sky-700">
              To build a globally connected and resilient healthcare ecosystem where
              critical resources are always within reach, and collaboration saves lives.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: ShieldCheck,
                title: "Security & Trust",
                description: "All hospital interactions and transactions are verified and encrypted for your safety.",
              },
              {
                Icon: MapPin,
                title: "Location-Aware",
                description: "Find the nearest hospitals, beds, and supplies in real-time using interactive maps.",
              },
              {
                Icon: HandshakeIcon,
                title: "Collaboration First",
                description: "We foster a community of hospitals that work together, not in silos.",
              },
              {
                Icon: Clock,
                title: "Real-Time Availability",
                description: "Up-to-the-minute data on ICU beds, oxygen, and critical supplies.",
              },
              {
                Icon: Globe2,
                title: "Scalable & Global",
                description: "Our platform scales across borders, connecting healthcare globally.",
              },
              {
                Icon: HeartHandshake,
                title: "Human-First Approach",
                description: "Everything we build is to support faster, safer patient outcomes.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                className="p-6 bg-white rounded-xl shadow-md text-center flex flex-col items-center"
              >
                <item.Icon className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sky-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">FAQs</h2>
          <div className="space-y-8">
            {[
              {
                question: "Is MedShare free to use?",
                answer:
                  "Yes, patients can access emergency services and hospital data for free. Hospitals may subscribe to premium tools and analytics.",
              },
              {
                question: "How does MedShare verify hospitals?",
                answer:
                  "Each hospital goes through a strict verification process before joining our network to ensure trust and reliability.",
              },
              {
                question: "What data is shared between hospitals?",
                answer:
                  "Only essential resource availability like beds, oxygen, and equipment is shared securely — no patient data is exchanged.",
              },
              {
                question: "Can this platform be used in rural areas?",
                answer:
                  "Yes! MedShare is designed for underserved areas and supports low-bandwidth environments with real-time location features.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                className="bg-sky-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-sky-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
