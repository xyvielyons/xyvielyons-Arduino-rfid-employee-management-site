import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import { Providers } from "@/lib/providers";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Checkin Attendance system",
  description: "RFID employee management system",
};

export const roboto = Roboto({
  subsets: ['latin'], // Adjust subsets based on your language needs
  weight: ['300', '400', '500', '700'], // Specify font weights
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`roboto.className`}>
              <Providers>
              {children}
              </Providers>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
