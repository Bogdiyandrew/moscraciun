import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import localFont from "next/font/local";
import WinterLoader from './components/WinterLoader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myCustomFont = localFont({
  src: "./fonts/PWHappyChristmas.ttf", // Calea către fișier (relativă la layout.tsx)
  variable: "--font-craciun",       // Numele variabilei CSS pentru Tailwind
  weight: "100 900",               // Specifică greutățile disponibile (sau o singură valoare gen "400")
});

export const metadata: Metadata = {
  title: "Biroul lui Moș Crăciun - Mesaje Video Personalizate",
  description: "Comandă un mesaj video magic pentru copilul tău, direct de la Polul Nord.",
};

import { LoadingProvider } from "./context/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${myCustomFont.variable} antialiased bg-background text-foreground`}>
        <LoadingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* 1. Loader-ul trebuie să fie AICI, în interiorul ThemeProvider, ca să ia culorile corecte */}
            <WinterLoader />

            <div className="flex min-h-screen">

              {/* Sidebar-ul (Stânga) */}
              <Navigation />

              {/* Zona Principală (Dreapta) */}
              <main className="flex-1 md:ml-64 relative">

                {/* Conținutul Paginii */}
                {children}

                {/* Footer-ul */}
                <Footer />

              </main>

            </div>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}