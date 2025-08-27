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
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-full bg-white`}
      >
        <div className="h-[9%] w-full border-b-2 border-indigo-300 lg:px-[15%] px-[5%] flex items-center  ">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
      <div className="h-[90%] w-full">
        {children}
      </div>
    </body>
  </html>
  )
}
