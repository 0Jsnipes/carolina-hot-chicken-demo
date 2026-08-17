import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Carolina Hot Chicken | Not Just Hot. Carolina Hot.",
  description: "An unapologetically hot chicken experience in North Myrtle Beach, South Carolina.",
  metadataBase: new URL("https://carolina-hot-chicken-demo.vercel.app"),
  openGraph: {
    title: "Carolina Hot Chicken",
    description: "Pick your heat. Accept your fate.",
    images: ["https://raw.githubusercontent.com/0Jsnipes/carolina-hot-chicken-demo/main/public/hero-hot-chicken.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
