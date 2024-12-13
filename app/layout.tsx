import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import NextjsTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "21Questions",
  description: "A Fun Site to Ask Questions anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:text-white dark:bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 bg-[length:200%_200%]-gray-800  font-mono`}
      >
        <Providers>
          <Navbar />
          {/* Blue */}
          {/* <NextjsTopLoader
            speed={300}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            height={2}
            color="#2299DD"
          /> */}

          {/* Green Top Bar */}
          <NextjsTopLoader
            speed={300}
            shadow="0 0 10px #32CD32,0 0 5px #32CD32"
            height={2}
            color="#32CD32"
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
