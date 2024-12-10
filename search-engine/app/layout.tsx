import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DarkModeProvider } from "@/components/dark-mode-provider";


// Define fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RPI Search",
  description: "Search engine for Rensselaer Polytechnic Institute",
  icons: {
    icon: '/favicon.ico',
  },
};

/**
 * RootLayout component that serves as the main layout for the application.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}