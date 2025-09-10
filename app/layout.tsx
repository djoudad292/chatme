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
  title: "Djaouad's Chat",
  description: "AI-powered chat app built by Djaouad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-black dark:text-gray-100`}
      >
        {/* Header */}
        <header className="h-[12%] w-full border-b border-indigo-200 dark:border-gray-800 shadow-sm bg-white/70 dark:bg-gray-900/70 backdrop-blur-md flex items-center justify-between px-[5%] lg:px-[15%]">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h1 className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Djaouad&apos;s Chat
            </h1>
          </div>
          <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
            AI Chatbot • PWA • Automation
          </div>
        </header>

        {/* Main content */}
        <main className="h-[88%] w-full">{children}</main>
      </body>
    </html>
  );
}
