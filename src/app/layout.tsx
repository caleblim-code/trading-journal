import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OneTrade - The Ultimate Trading Platform',
  description: 'Advanced trading journal and analytics platform.',
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
