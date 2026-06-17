import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Modern summer eCommerce platform built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        {/* Persistent Top Navigation Bar */}
        <Navbar />
        
        {/* Main Workspace content takes up all remaining vertical space */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Persistent Bottom Footer */}
        <Footer />
      </body>
    </html>
  );
}