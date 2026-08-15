import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ThinQnique',
  description: 'Internal Hackathon 2026 – ThinQnique Team Selection',
  icons: {
    icon: 'https://res.cloudinary.com/dfi26rd6m/image/upload/v1756807923/CSI_LOGO_jeozg4.avif',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-gradient-to-br from-[#2D1E2F] to-[#4E2A4F] min-h-screen">
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
