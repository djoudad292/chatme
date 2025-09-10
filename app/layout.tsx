import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Djaouad's chat",
  description: "Chat app made by djaouad with AI chatbot feature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-full bg-gray-100`}
      >
        {/* Navbar */}
        <div className="h-[9%] w-full bg-white border-b border-indigo-200 shadow-sm px-4 sm:px-6 md:px-10 lg:px-[15%] flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="w-20 h-auto sm:w-24 md:w-28 lg:w-32"
            priority
          />
        </div>

        {/* Main content */}
        <div className="h-[91%] w-full flex justify-center items-center px-2 sm:px-4 md:px-8 lg:px-[10%]">
          <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[75%] h-full bg-white rounded-lg shadow-md overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
