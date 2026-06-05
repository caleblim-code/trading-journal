'use client';

import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ showSpinner: false, minimum: 0.3 });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
    return () => { NProgress.start(); };
  }, [pathname]);

  return (
    <>
      <Toaster 
        theme="dark" 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-lg)'
          }
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', minHeight: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
