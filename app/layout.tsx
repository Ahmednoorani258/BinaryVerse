import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalRAMVisualizer from "@/components/RamVisualizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BinaryVerse",
  description: "Learn how data becomes binary — an interactive visual guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Header />
        <main className="min-h-screen max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>
        {/* <GlobalRAMVisualizer/> */}
        <Footer />
      </body>
    </html>
  );
}
