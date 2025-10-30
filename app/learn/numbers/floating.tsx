"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FloatingTab() {
  const [input, setInput] = useState("10.75");

  // Convert float to IEEE 754 single-precision binary
  const num = parseFloat(input);
  const signBit = num < 0 ? 1 : 0;
  const absNum = Math.abs(num);

  // Step 1: Separate integer and fractional parts
  const intPart = Math.floor(absNum);
  const fracPart = absNum - intPart;

  // Step 2: Integer to binary
  const intBinary = intPart.toString(2);

  // Step 3: Fraction to binary (6 bits for simplicity)
  let fracBinary = "";
  let fraction = fracPart;
  for (let i = 0; i < 6; i++) {
    fraction *= 2;
    if (fraction >= 1) {
      fracBinary += "1";
      fraction -= 1;
    } else {
      fracBinary += "0";
    }
  }

  // Step 4: Combine
  const binaryRaw = `${intBinary}.${fracBinary}`;

  // Step 5: Normalize
  const exponent = intBinary.length - 1;
  const mantissa = (intBinary + fracBinary).slice(1, 1 + 23);
  const bias = 127;
  const storedExp = exponent + bias;
  const expBinary = storedExp.toString(2).padStart(8, "0");

  const ieee754 = `${signBit} ${expBinary} ${mantissa.padEnd(23, "0")}`;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">
        Floating Point Representation (IEEE 754)
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Floating-point numbers are stored using three fields:
        <strong> Sign bit</strong>, <strong>Exponent</strong> (with bias), and{" "}
        <strong>Mantissa</strong> (fractional part).
      </p>

      <input
        type="number"
        step="any"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-center w-40 mb-8"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="text-left max-w-2xl mx-auto">
          <h3 className="font-semibold mb-2 text-lg text-gray-700">
            Step-by-step Breakdown
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              1️⃣ Integer part (<code>{intPart}</code>) →{" "}
              <strong>{intBinary}</strong>
            </p>
            <p>
              2️⃣ Fractional part (<code>{fracPart.toFixed(4)}</code>) →{" "}
              <strong>{fracBinary}</strong>
            </p>
            <p>
              3️⃣ Combined → <strong>{binaryRaw}</strong>
            </p>
            <p>
              4️⃣ Normalized →{" "}
              <strong>
                1.{(intBinary + fracBinary).slice(1)} × 2<sup>{exponent}</sup>
              </strong>
            </p>
            <p>
              5️⃣ Exponent = {exponent} + Bias (127) ={" "}
              <strong>{storedExp}</strong> →{" "}
              <strong>{expBinary}</strong>
            </p>
            <p>
              6️⃣ Mantissa (fraction) →{" "}
              <strong>{mantissa.padEnd(23, "0")}</strong>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="font-mono text-lg bg-gray-100 border border-gray-300 rounded-lg inline-block px-6 py-4 shadow-sm"
        >
          <div>
            <span className="text-red-500">Sign:</span> {signBit}
          </div>
          <div>
            <span className="text-blue-500">Exponent:</span> {expBinary}
          </div>
          <div>
            <span className="text-green-600">Mantissa:</span>{" "}
            {mantissa.padEnd(23, "0")}
          </div>
        </motion.div>

        <p className="text-gray-500 text-sm">
          Example: IEEE 754 (32-bit) = 1 bit sign + 8 bits exponent + 23 bits mantissa
        </p>
      </motion.div>
      
    </div>
  );
}
