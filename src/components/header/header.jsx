import { Link } from 'react-router-dom';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>
          <Link to={'/'}>Realworld Blog</Link>
        </h1>
        <nav className={styles.header_nav}>
          <Link to={'/sign-in'} className={styles.nav_link}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={`${styles.nav_link} ${styles.nav_link__green}`}>
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
