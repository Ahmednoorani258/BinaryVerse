"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UnsignedTab from "./unsigned";
import SignedTab from "./signed";
import FloatingTab from "./floating";
import ExcessTab from "./excess";

const tabs = [
  { id: "unsigned", label: "Unsigned" },
  { id: "signed", label: "Signed (2’s Complement)" },
  { id: "floating", label: "Floating Point" },
  { id: "excess", label: "Excess / Bias" },
];

export default function NumbersPage() {
  const [activeTab, setActiveTab] = useState("unsigned");

  const renderTab = () => {
    switch (activeTab) {
      case "unsigned":
        return <UnsignedTab />;
      case "signed":
        return <SignedTab />;
      case "floating":
        return <FloatingTab />;
      case "excess":
        return <ExcessTab />;
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Numbers in Binary</h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Explore how computers represent numbers — from simple unsigned binary to floating-point formats.
      </p>

      {/* Tabs Navigation */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
