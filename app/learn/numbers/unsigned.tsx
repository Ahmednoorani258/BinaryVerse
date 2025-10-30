"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UnsignedTab() {
  const [input, setInput] = useState("25");
  const num = parseInt(input) || 0;
  const binary = num.toString(2);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Unsigned Binary</h2>
      <p className="text-gray-600 mb-6">
        In <strong>unsigned representation</strong>, all bits store the value itself.
        No sign bit is used — so all numbers are non-negative.
      </p>

      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-center w-32 mb-6"
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="font-mono text-lg bg-gray-100 border border-gray-300 rounded-lg inline-block px-6 py-3 shadow-sm"
      >
        {num} → <span className="text-blue-600">{binary}</span>
      </motion.div>
    </div>
  );
}
