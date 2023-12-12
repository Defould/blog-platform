import { Tag, Statistic } from 'antd';

import avatar from '../../shared/assets/avatar.png';
import heart from '../../shared/assets/heart 1.svg';

import styles from './articleItem.module.scss';

const ArticleItem = () => {
  return (
    <div className={styles.item}>
      <div className={styles.item_content}>
        <div className={styles.content_header}>
          <a className={styles.content_title}>Some article title</a>
          <button className={styles.content_likes}>
            <img src={heart} alt="like icon" />
          </button>
          <Statistic className={styles.content_stats} value={11} />
        </div>

        <div className={styles.content_tag}>
          <Tag>Tag 1</Tag>
          <Tag>Tag 2</Tag>
        </div>
        <p className={styles.content_text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>

      <div className={styles.item_author}>
        <div className={styles.author_data}>
          <p className={styles.data_name}>John Doe</p>
          <p className={styles.data_date}>March 5, 2020 </p>
        </div>

        <img className={styles.author_img} src={avatar} alt="author photo" />
      </div>
    </div>
  );
};

export default ArticleItem;
