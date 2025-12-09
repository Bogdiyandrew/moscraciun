import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; // Asigură-te că e importat
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biroul lui Moș Crăciun - Mesaje Video Personalizate",
  description: "Comandă un mesaj video magic pentru copilul tău, direct de la Polul Nord.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col md:flex-row">

            {/* Sidebar-ul (Stânga) */}
            <Navigation />

            {/* Zona Principală (Dreapta) */}
            {/* Clasa md:pl-64 este CRITICĂ. Ea împinge tot conținutul la dreapta pe desktop */}
            <main className="flex-1 w-full md:pl-64 transition-all duration-300 flex flex-col min-h-screen relative">

              {/* Conținutul Paginii */}
              <div className="flex-1">
                {children}
              </div>

              {/* --- AICI TREBUIE SĂ FIE FOOTER-UL --- */}
              {/* Fiind în interiorul main-ului cu md:pl-64, nu va mai fi acoperit de meniu */}
              <Footer />

            </main>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}