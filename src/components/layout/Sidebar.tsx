'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Trades List', path: '/trades', icon: '📝' },
  { label: 'Add Trade', path: '/trades/new', icon: '➕' },
  { label: 'Analytics', path: '/analytics', icon: '📈' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '4px', boxShadow: 'var(--glow-primary)' }}></div>
        OneTrade
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span style={{ marginRight: '0.5rem' }}>{item.icon}</span> {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
