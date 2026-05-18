import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/shared/Navbar";
import Footer from "./Components/shared/Footer";
import { ThemeProvider } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Idea Vault",
  description: "Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning // 💡 1. theme change o browser extension-er error rodh korbe
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
