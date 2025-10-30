"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toBinary, explainTwosComplement } from "@/lib/binaryUtils";

export default function SignedTab() {
  const [input, setInput] = useState("-6");
  const [bits, setBits] = useState(8);
  const num = parseInt(input) || 0;
  const binary = toBinary(num, bits);
  const steps = explainTwosComplement(num, bits);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Signed Binary (2’s Complement)</h2>
      <p className="text-gray-600 mb-6">
        Negative numbers are stored using <strong>2’s Complement</strong> — the most common
        signed integer representation.
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-center w-32"
        />
        <select
          value={bits}
          onChange={(e) => setBits(parseInt(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value={4}>4 bits</option>
          <option value={8}>8 bits</option>
          <option value={16}>16 bits</option>
        </select>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-mono text-lg bg-gray-100 border border-gray-300 rounded-lg inline-block px-6 py-3 shadow-sm"
      >
        {num} → <span className="text-blue-600">{binary}</span>
      </motion.div>

      <div className="mt-6 text-left max-w-md mx-auto space-y-2">
        {steps.map((step, i) => (
          <p key={i} className="text-gray-700">{step}</p>
        ))}
      </div>
    </div>
  );
}
