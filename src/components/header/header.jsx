import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../slices/userSlice';

import styles from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { username } = useSelector((state) => state.users);
  const { image } = useSelector((state) => state.users);
  console.log(image);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>
          <Link to={'/'}>Realworld Blog</Link>
        </h1>
        <nav className={styles.header_nav}>
          {token ? (
            <>
              <Link to={'/sign-up'} className={`${styles.nav_link} ${styles.nav_link__green}`}>
                Create article
              </Link>
              <div className={styles.user_data}>
                <Link to={'/profile'} className={styles.user_data_username}>
                  {username}
                </Link>
                <img className={styles.user_data_img} src={image} alt="users photo" />
              </div>
              <Link
                to={'/'}
                onClick={() => dispatch(logOut())}
                className={`${styles.nav_link} ${styles.nav_link__logOut}`}
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to={'/sign-in'} className={styles.nav_link}>
                Sign In
              </Link>
              <Link to={'/sign-up'} className={`${styles.nav_link} ${styles.nav_link__green}`}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
