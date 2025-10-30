// components/BinaryBox.tsx
import { motion } from "framer-motion";

export default function BinaryBox({ bits }: { bits: string }) {
  return (
    <div className="flex gap-1 justify-center mt-4">
      {bits.split("").map((bit, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-lg shadow-md ${
            bit === "1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {bit}
        </motion.div>
      ))}
    </div>
  );
}
