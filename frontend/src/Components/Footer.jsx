import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { useInView } from "react-intersection-observer";

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
};

function Footer() {
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <footer className="bg-gradient-to-b from-white to-sky-50 py-16 mt-auto z-50" ref={ref3}>
            <motion.div
                initial="hidden"
                animate={inView3 ? "visible" : "hidden"}
                variants={staggerContainer}
                className="container mx-auto max-w-6xl px-4"
            >
                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <HeartPulse className="h-8 w-8 text-sky-500" />
                            <span className="text-2xl font-bold text-sky-900">MedExchange</span>
                        </div>
                        <p className="text-sky-700 mb-6">
                            Revolutionizing healthcare resource management through seamless hospital connections and efficient supply exchange.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-sky-500 hover:text-sky-600">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" className="text-sky-500 hover:text-sky-600">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                            <a href="#" className="text-sky-500 hover:text-sky-600">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-sky-900">About</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">Our Mission</Link></li>
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">How It Works</Link></li>
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">Team</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-sky-900">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">FAQ</Link></li>
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-sky-900">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/about" className="text-sky-700 hover:text-sky-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-sky-100">
                    <div className="text-sky-700 text-center flex justify-center items-center">
                        <p>&copy; 2025 MedExchange. All rights reserved.</p>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}

export default Footer;