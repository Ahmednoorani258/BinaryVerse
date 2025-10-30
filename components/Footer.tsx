// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-500" />
            <p>
              Built with ❤️ by <span className="font-semibold text-gray-700">Muhammad Ahmed</span>
            </p>
          </div>
          <p>© {new Date().getFullYear()} BinaryVerse — All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
