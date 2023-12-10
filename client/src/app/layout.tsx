import React from "react";

import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "@/utils/next-themes";
import { Toaster } from "react-hot-toast";
import { Poppins, Josefin_Sans } from "next/font/google";
import Custom from "@/utils/Custom";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefind = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefind",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${poppins.variable} ${josefind.variable} bg-white custom-scrollbar bg-no-repeat dark:bg-gradient-to-b  duration-300 dark:bg-iris1 min-h-[100vh] h-full`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Custom>{children}</Custom>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
