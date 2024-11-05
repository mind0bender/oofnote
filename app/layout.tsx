import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const geistSans: NextFontWithVariable = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono: NextFontWithVariable = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OofNote",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`flex flex-col w-full min-h-screen bg-stone-950 ${geistSans.variable} ${geistMono.variable} antialiased px-10 sm:px-16 md:px-24 lg:px-40 xl:px-52 2xl:px-64 selection:bg-yellow-300 selection:text-stone-950`}>
        <div
          className={`flex flex-col grow w-full bg-black text-stone-100 border-x border-x-stone-700 border-dashed`}>
          <Navbar />
          <Suspense
            fallback={
              <div className="flex-grow flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
              </div>
            }>
            {children}
          </Suspense>
          <Footer />
        </div>
        <ToastContainer theme={"dark"} position={"bottom-right"} />
      </body>
    </html>
  );
}
