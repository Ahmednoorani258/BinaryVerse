"use client";
import { useState } from "react";
import { textToBinary } from "@/lib/binaryUtils";
import BinaryBox from "@/components/BinaryBox";

export default function TextPage() {
  const [input, setInput] = useState("A");
  const binary = textToBinary(input);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Text to Binary Conversion
      </h1>

      <p className="text-gray-600 mb-6">
        Every letter or symbol you type is stored in binary form using <strong>ASCII</strong> or <strong>Unicode</strong> encoding.
      </p>

      <input
        type="text"
        maxLength={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6">
        <p className="font-mono text-gray-700 mb-2">
          {input} → {binary}
        </p>
        <BinaryBox bits={binary.replace(/\s+/g, "")} />
      </div>
    </div>
  );
}
