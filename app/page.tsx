"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center mt-20">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold text-gray-800"
      >
        Learn How Computers See the World in <span className="text-blue-600">Binary</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-gray-600 max-w-2xl mx-auto"
      >
        Explore how text, numbers, images, and sounds turn into 0s and 1s — with visual, interactive examples.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/learn/text"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all"
        >
          Start Learning →
        </Link>
      </motion.div>
    </section>
  );
}
