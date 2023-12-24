import { Link } from 'react-router-dom';

import img from '../../shared/assets/404_bender.png';

import styles from './notFound.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.not_found_text}>Page not found</div>
      <img className={styles.not_found_img} src={img} alt="not found page" />
      <div className={styles.not_found_link}>
        <Link to={'/'}>Return to the main</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
