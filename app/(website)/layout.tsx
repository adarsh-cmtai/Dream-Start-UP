import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Navigation } from "@/components/layout/website/navigation";
import { Footer } from "@/components/layout/website/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduPro - Professional Online Training Platform",
  description:
    "Unlock your potential with expert-led online training programs. Join thousands of professionals advancing their careers.",

};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
          <Navigation />
          {children}
          <Footer />
      </div>
  );
}
