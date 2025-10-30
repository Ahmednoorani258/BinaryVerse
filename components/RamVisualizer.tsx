"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RAMVisualizerProps {
  data?: string[]; // Array of binary strings (each = 1 byte, 8 bits)
}

export default function GlobalRAMVisualizer({
  data = ["01001010", "10101100", "00001111"],
}: RAMVisualizerProps) {
  const [ram, setRam] = useState<string[]>(data);

  // Example: in future you can update RAM dynamically from context
  useEffect(() => {
    setRam(data);
  }, [data]);

  return (
    <div className="mt-12 border-t border-gray-300 pt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        🧠 RAM Memory Visualization
      </h3>

      <div className="flex flex-col items-center gap-3">
        {ram.map((byte, rowIdx) => (
          <motion.div
            key={rowIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIdx * 0.05 }}
            className="flex items-center gap-4"
          >
            {/* Memory address */}
            <div className="font-mono text-gray-500 text-sm w-20 text-right">
              Addr {rowIdx.toString().padStart(4, "0")}
            </div>

            {/* Byte visualization */}
            <div className="flex gap-1">
              {byte.split("").map((bit, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.02 }}
                  className={`w-6 h-6 flex items-center justify-center rounded-md font-mono text-xs ${
                    bit === "1"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {bit}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-4 max-w-lg mx-auto">
        Each row represents a byte in memory (8 bits). Future modules will show how
        numbers, text, or media occupy these bytes.
      </p>
    </div>
  );
}
