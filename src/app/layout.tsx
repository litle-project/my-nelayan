import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Snakebar from "@/components/Snakebar";
import { ReduxProvider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ReduxProvider>
          {children}
          <Snakebar />
        </ReduxProvider>
      </body>
    </html>
  );
}

