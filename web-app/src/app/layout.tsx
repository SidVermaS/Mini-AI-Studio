import type { Metadata } from "next";
import {Mulish } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts";


const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-mulish",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Modelia",
  description: "AI Studio for Image generation studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${mulish.variable} ${mulish.className}`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
