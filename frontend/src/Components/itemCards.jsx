
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, X, Calendar, Building2 } from "lucide-react";

const ItemCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Card animation variants
  const cardVariants = {
    normal: {
      scale: 1,
      zIndex: 1,
    },
    expanded: {
      scale: 1.1,
      zIndex: 50,
    }
  };

  return (
    <>
      {/* Backdrop for expanded state */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Item Card */}
      <motion.div
        variants={cardVariants}
        animate={isExpanded ? "expanded" : "normal"}
        className={`
          relative bg-white rounded-xl shadow-lg overflow-hidden
          ${isExpanded ? 
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl z-50' : 
            'w-full max-w-sm'
          }
        `}
      >
        {/* Card Header */}
        <div className="relative h-48">
        <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full h-full"
        />
        <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
            {isExpanded ? 
            <X className="w-5 h-5 text-sky-900" /> : 
            <MoreVertical className="w-5 h-5 text-sky-900" />
            }
        </button>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-sky-900">{item.name}</h3>
          
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sky-700">Quantity:</span>
              <span className="font-medium">{item.quantity} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-700">Price:</span>
              <span className="font-medium">₹{item.price}/unit</span>
            </div>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 mt-4 pt-4 border-t"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-500" />
                  <span className="text-sky-700">Expiry Date:</span>
                  <span className="font-medium">{item.expiryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-sky-500" />
                  <span className="text-sky-700">Seller:</span>
                  <span className="font-medium">{item.hospitalName}</span>
                </div>
                <p className="text-sky-700 mt-2">{item.description}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className={`flex gap-3 mt-4 ${isExpanded ? 'pt-4 border-t' : ''}`}>
              <button className="flex-1 bg-sky-100 hover:bg-sky-200 text-sky-700 py-2 rounded-md transition-colors">
                Request
              </button>
              <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ItemCard;