import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.userProfile}>
        <div className={styles.avatar}>U</div>
        <span>User</span>
      </div>
    </header>
  );
}
