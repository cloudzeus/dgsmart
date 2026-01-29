import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DGSMART | AI & IoT Integrator",
  description: "Η DGSMART είναι ηγέτης στην ενσωμάτωση AI και IoT λύσεων. Παρέχουμε LiDAR ανίχνευση, έξυπνη γεωργία, έξυπνα κτίρια και ολοκληρωμένη ενσωμάτωση ERP.",
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
