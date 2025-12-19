import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import SmoothScroll from "@/components/smooth-scroll";


const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gupta Ji Store",
  description: "Order online from Gupta Ji Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(outfit.className, "min-h-screen bg-background font-sans antialiased")}>
        <AuthProvider>
          <CartProvider>
            <SmoothScroll />

            {children}
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
