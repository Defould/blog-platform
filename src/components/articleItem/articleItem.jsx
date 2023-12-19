import { Tag, Statistic } from 'antd';
import { format } from 'date-fns';

import heart from '../../shared/assets/heart 1.svg';

import styles from './articleItem.module.scss';

const ArticleItem = ({ title, description, tagList, createdAt, author, favoritesCount }) => {
  const tag = tagList.length > 0 ? tagList.map((tag) => <Tag key={tag}>{tag}</Tag>) : <Tag>{'Not found tags'}</Tag>;
  const formatDate = format(new Date(createdAt), 'MMMM dd, yyyy');
  const authorName = author.username;
  const authorImgUrl = author.image;

  return (
    <div className={styles.item}>
      <div className={styles.item_content}>
        <div className={styles.content_header}>
          <a className={styles.content_title}>{title}</a>
          <button className={styles.content_likes}>
            <img src={heart} alt="like icon" />
          </button>
          <Statistic className={styles.content_stats} value={favoritesCount} />
        </div>

        <div className={styles.content_tag}>{tag}</div>
        <p className={styles.content_text}>{description}</p>
      </div>

      <div className={styles.item_author}>
        <div className={styles.author_data}>
          <p className={styles.data_name}>{authorName}</p>
          <p className={styles.data_date}>{formatDate} </p>
        </div>

        <img className={styles.author_img} src={authorImgUrl} alt="author photo" />
      </div>
    </div>
  );
};

export default ArticleItem;
