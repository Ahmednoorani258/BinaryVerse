"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ImageMemoryVisualizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [binaryDump, setBinaryDump] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 📁 Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  // 🧠 Decode image → extract binary data
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 32;
      const height = 32;
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });

      // 🧩 Draw the image scaled down to 32x32
      ctx.drawImage(img, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);
      const binaryArray: string[] = [];

      // Each pixel: R, G, B (ignore A)
      for (let i = 0; i < data.length; i += 4) {
        binaryArray.push(data[i].toString(2).padStart(8, "0"));     // R
        binaryArray.push(data[i + 1].toString(2).padStart(8, "0")); // G
        binaryArray.push(data[i + 2].toString(2).padStart(8, "0")); // B
      }

      setBinaryDump(binaryArray);
      setLoading(false);
    };
  }, [imageSrc]);

  // 🎨 Helper: Color preview (like RAM LED)
  const getColor = (bits: string) => {
    const val = parseInt(bits, 2);
    return `rgb(${val}, ${val}, ${val})`;
  };

  return (
    <div className="p-8 text-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.h1
        className="text-4xl font-extrabold mb-4 text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧠 Image → Binary Memory Visualizer
      </motion.h1>

      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Upload a small image (recommended ≤ 32×32). This tool decodes it pixel by pixel, 
        showing how raw RGB bytes are stored sequentially in computer memory.
      </p>

      {/* Upload control */}
      <label className="inline-block cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Canvas & Output */}
      {imageSrc && (
        <motion.div
          className="flex flex-col items-center mt-10 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Preview */}
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="border-2 border-gray-300 rounded-lg shadow-lg"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Info */}
          <div className="text-sm text-gray-500">
            Resolution: {dimensions.width}×{dimensions.height} | 
            Bytes in Memory: {binaryDump.length}
          </div>

          {/* Binary Grid */}
          {loading ? (
            <p className="text-gray-400 italic">Processing image...</p>
          ) : (
            <div className="bg-white border rounded-lg shadow-inner p-4 w-full max-w-5xl text-left overflow-y-scroll max-h-[450px] font-mono text-xs">
              <h2 className="font-bold text-lg mb-3 text-gray-700">
                💾 Memory Dump ({binaryDump.length} bytes)
              </h2>

              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {binaryDump.map((bits, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-1 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-sm border"
                        style={{ backgroundColor: getColor(bits) }}
                      ></span>
                      <span className="text-gray-700">Addr {i.toString().padStart(4, "0")}:</span>
                    </div>
                    <div className="text-blue-700 text-[11px]">{bits}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
