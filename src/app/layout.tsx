import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TradeZella Clone - The Ultimate Trading Journal',
  description: 'AI-powered trading journal designed to automate performance tracking and provide actionable insights for traders.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
