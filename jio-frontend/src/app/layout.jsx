import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import StoreProvider from "../providers/StoreProvider";
import { Toaster } from "../components/ui/Toaster";
import AuthProvider from "../providers/AuthProvider";
import NpProgressProvider from "../providers/NpProgressProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jio Cinema Clone",
  description: "A clone of jio cinema for educational purpose only.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en" className="scroll-smooth">
        <body className={inter.className}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
          {/*<NpProgressProvider />*/}
        </body>
      </html>
    </StoreProvider>
  );
}
