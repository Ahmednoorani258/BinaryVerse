"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ExcessTab() {
  const [bias, setBias] = useState(127);
  const [actual, setActual] = useState(3);
  const stored = actual + bias;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Excess / Bias Notation</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        In <strong>excess (or bias)</strong> notation, we store exponents by adding a bias value 
        to make all stored numbers non-negative.
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-500">Bias</label>
          <input
            type="number"
            value={bias}
            onChange={(e) => setBias(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500">Actual Exponent</label>
          <input
            type="number"
            value={actual}
            onChange={(e) => setActual(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono bg-gray-100 border border-gray-300 rounded-lg inline-block px-6 py-3 shadow-sm text-lg"
      >
        Stored Exponent = {actual} + {bias} ={" "}
        <span className="text-blue-600">{stored}</span> →{" "}
        <span className="text-green-600">
          {stored.toString(2).padStart(8, "0")}
        </span>
      </motion.div>

      <p className="text-gray-500 mt-4 text-sm">
        Example: IEEE 754 single precision uses Bias = 127
      </p>
    </div>
  );
}
