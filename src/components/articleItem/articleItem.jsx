import { nanoid } from '@reduxjs/toolkit';
import { Statistic, Tag } from 'antd';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import heart from '../../shared/assets/heart 1.svg';

import styles from './articleItem.module.scss';

const ArticleItem = ({ slug, title, description, body, tagList, createdAt, author, favoritesCount, fullArticle }) => {
  const tags = tagList.length > 0 ? tagList.map((tag) => <Tag key={nanoid()}>{tag}</Tag>) : null;
  const formatDate = format(new Date(createdAt), 'MMMM dd, yyyy');
  const authorName = author.username;
  const authorImgUrl = author.image;
  const { username } = useSelector((state) => state.users);

  return (
    <div className={styles.item}>
      <div className={styles.item_top}>
        <div className={styles.item_info}>
          <div className={styles.info_header}>
            <Link className={styles.info_title} to={`articles/${slug}`}>
              {title}
            </Link>
            <button className={styles.info_likes}>
              <img src={heart} alt="like icon" />
            </button>
            <Statistic className={styles.info_stats} value={favoritesCount} />
          </div>

          <div className={styles.info_tag}>{tags}</div>
          <p className={styles.info_descr}>{description}</p>
        </div>

        <div className={styles.item_author}>
          <div className={styles.author_data}>
            <p className={styles.data_name}>{authorName}</p>
            <p className={styles.data_date}>{formatDate}</p>
            {fullArticle && username === authorName && (
              <div className={styles.data_buttons}>
                <button className={`${styles.data_button} ${styles.data_button__delete}`}>Delete</button>
                <Link to={`/articles/${slug}/edit`} className={`${styles.data_button} ${styles.data_button__edit}`}>
                  Edit
                </Link>
              </div>
            )}
          </div>

          <img className={styles.author_img} src={authorImgUrl} alt="author photo" />
        </div>
      </div>

      {fullArticle && (
        <div className={styles.item_body}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  );
};

export default ArticleItem;
