import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Statistic, Tag, Popconfirm, message, Avatar } from 'antd';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/UserOutlined';

import { deleteArticle, favoriteArticle, unFavoriteArticle } from '../../slices/articlesSlice';
import favoritIcon from '../../shared/assets/favorit.svg';
import unfavoritIcon from '../../shared/assets/unfavorit.svg';

import styles from './articleItem.module.scss';

const ArticleItem = ({
  slug,
  title,
  description,
  body,
  tagList,
  createdAt,
  author,
  favoritesCount,
  favorited,
  fullArticle,
}) => {
  let [isLike, setIsLike] = useState(favorited);
  let [likeCount, setLikeCount] = useState(favoritesCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = tagList.length > 0 ? tagList.map((tag) => <Tag key={nanoid()}>{tag}</Tag>) : null;
  const formatDate = format(new Date(createdAt), 'MMMM dd, yyyy');
  const authorName = author.username;
  const authorImgUrl = author.image;
  const { username } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.users);

  const onDelete = () => {
    dispatch(deleteArticle(slug));
    navigate('/');
  };

  const onFavorite = () => {
    if (!token) {
      message.error('You are not logged in!');
      return;
    }

    if (!isLike) {
      dispatch(favoriteArticle(slug));
      setLikeCount((l) => l + 1);
    } else {
      dispatch(unFavoriteArticle(slug));
      setLikeCount((l) => l - 1);
    }
    setIsLike(!isLike);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_top}>
        <div className={styles.item_info}>
          <div className={styles.info_header}>
            <Link className={styles.info_title} to={`articles/${slug}`}>
              {title}
            </Link>
            {isLike ? (
              <button onClick={onFavorite} className={styles.info_likes}>
                <img src={favoritIcon} alt="like icon" />
              </button>
            ) : (
              <button onClick={onFavorite} className={styles.info_likes}>
                <img src={unfavoritIcon} alt="like icon" />
              </button>
            )}
            <Statistic className={styles.info_stats} value={likeCount} />
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
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={onDelete}
                >
                  <button className={`${styles.data_button} ${styles.data_button__delete}`}>Delete</button>
                </Popconfirm>

                <Link to={`/articles/${slug}/edit`} className={`${styles.data_button} ${styles.data_button__edit}`}>
                  Edit
                </Link>
              </div>
            )}
          </div>

          {/* <img className={styles.author_img} src={authorImgUrl} alt="author photo" /> */}
          <Avatar size={64} icon={<UserOutlined />} src={authorImgUrl} alt="author photo" />
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
