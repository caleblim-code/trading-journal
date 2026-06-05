'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { name: '仪表盘 (Dashboard)', path: '/' },
  { name: '交易记录 (Trades)', path: '/trades' },
  { name: '分析 (Analytics)', path: '/analytics' },
  { name: '设置 (Settings)', path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
        Trading Journal
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
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
