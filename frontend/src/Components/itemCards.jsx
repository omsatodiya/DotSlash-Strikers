import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, X, Calendar, Building2 } from "lucide-react";

const ItemCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Add scroll lock effect
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

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

  // Format the date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center overflow-y-auto"
            onClick={() => setIsExpanded(false)}
          >
            {/* Add inner div to prevent click propagation on card content */}
            <div onClick={(e) => e.stopPropagation()} className="min-h-full w-full flex items-center justify-center p-4">
              <motion.div
                variants={cardVariants}
                animate={isExpanded ? "expanded" : "normal"}
                className="relative bg-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] w-[80%] max-w-xl z-50"
              >
                {/* Card Header */}
                <div className="relative h-32 bg-sky-100 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-sky-900">{item.category}</span>
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
                      <span className="text-sky-700">Available:</span>
                      <span className="font-medium">{item.quantity} units</span>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex justify-between items-center">
                      <span className="text-sky-700">Select:</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-2 py-1 bg-sky-100 text-sky-700 rounded-md"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= item.quantity) {
                              setQuantity(value);
                            }
                          }}
                          className="w-16 text-center border rounded-md"
                          min="1"
                          max={item.quantity}
                        />
                        <button 
                          onClick={() => setQuantity(Math.min(item.quantity, quantity + 1))}
                          className="px-2 py-1 bg-sky-100 text-sky-700 rounded-md"
                        >
                          +
                        </button>
                      </div>
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
                          <span className="font-medium">{formatDate(item.expiryDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-sky-500" />
                          <span className="text-sky-700">Status:</span>
                          <span className="font-medium capitalize">{item.status}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className={`flex gap-3 mt-4 ${isExpanded ? 'pt-4 border-t' : ''}`}>
                      <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md transition-colors">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal card view */}
      {!isExpanded && (
        <motion.div
          variants={cardVariants}
          animate="normal"
          className="relative bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[280px]"
        >
          {/* Card Header */}
          <div className="relative h-32 bg-sky-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-sky-900">{item.category}</span>
            <button 
              onClick={() => setIsExpanded(true)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-sky-900" />
            </button>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-sky-900">{item.name}</h3>
            
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sky-700">Available:</span>
                <span className="font-medium">{item.quantity} units</span>
              </div>

              {/* Quantity selector */}
              <div className="flex justify-between items-center">
                <span className="text-sky-700">Select:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 bg-sky-100 text-sky-700 rounded-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= item.quantity) {
                        setQuantity(value);
                      }
                    }}
                    className="w-16 text-center border rounded-md"
                    min="1"
                    max={item.quantity}
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(item.quantity, quantity + 1))}
                    className="px-2 py-1 bg-sky-100 text-sky-700 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default ItemCard;