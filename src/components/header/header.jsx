import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>Realworld Blog</h1>
        <nav className={styles.header_nav}>
          <button className={styles.nav_btn}>Sign In</button>
          <button className={`${styles.nav_btn} ${styles.nav_btn__green}`}>Sign Up</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
