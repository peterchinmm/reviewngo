"use client";

import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import useSession from "@/lib/useSession";
import { Toaster } from "react-hot-toast";
import { UserDetailsProvider } from "@/context/UserDetailsContext";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Review N Go",
  description: "Peter Chin Meng Meng's FYP :(",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();

  const hasId: boolean = Boolean(user?.profileCompleted);

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        {!hasId && (
          <>
            <Toaster position="top-center" />
            {children}
          </>
        )}
        {hasId && (
          <UserDetailsProvider>
            <div className="flex flex-row">
              <Sidebar />
              <div className="w-full relative ml-60">
                <Header />
                <div className="mt-16 p-5">
                  <Toaster position="top-center" />
                  {children}
                </div>
              </div>
            </div>
          </UserDetailsProvider>
        )}
      </body>
    </html>
  );
}
