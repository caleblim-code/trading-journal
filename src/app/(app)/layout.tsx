import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Trading Journal',
  description: 'A modern trading journal web application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ marginLeft: '250px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ padding: '2rem', flex: 1, backgroundColor: 'var(--background)' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
