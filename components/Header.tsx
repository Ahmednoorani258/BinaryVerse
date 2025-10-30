// components/Header.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Binary, Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Binary className="w-6 h-6 text-blue-600" />
          <Link href="/" className="text-xl font-bold text-gray-800">
            BinaryVerse
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/learn/text" className="hover:text-blue-600 transition-colors">Text</Link>
          <Link href="/learn/numbers" className="hover:text-blue-600 transition-colors">Numbers</Link>
          <Link href="/learn/image" className="hover:text-blue-600 transition-colors">Images</Link>
          <Link href="/learn/audio" className="hover:text-blue-600 transition-colors">Audio</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}
