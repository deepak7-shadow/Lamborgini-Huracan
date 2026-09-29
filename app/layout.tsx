import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lamborghini Huracán | Master of Aerodynamics",
  description:
    "An interactive 360° scrollytelling luxury automotive experience for the Lamborghini Huracán LP 640-4. Powered by a 5.2L naturally aspirated V10 engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} dark scroll-smooth`}>
      <body className="bg-pagani-black text-white font-rajdhani antialiased selection:bg-pagani-gold selection:text-black min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
