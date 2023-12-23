import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';

import { fetchArticle } from '../../slices/articlesSlice';
import ArticleItem from '../articleItem/articleItem';

import styles from './article.module.scss';

const Article = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const article = useSelector((state) => state.article);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const { slug } = params;
    dispatch(fetchArticle(slug));
  }, [dispatch]);

  return (
    <div className={styles.article}>
      {isLoading && <Spin size="large" className={styles.article_spin} />}
      {article && (
        <>
          <ArticleItem
            className={styles.article_header}
            slug={article.slug}
            title={article.title}
            description={article.description}
            body={article.body}
            tagList={article.tagList}
            createdAt={article.createdAt}
            author={article.author}
            favoritesCount={article.favoritesCount}
            fullArticle={true}
          />
        </>
      )}
      {error && <Alert message={error} type="error" />}
    </div>
  );
};
export default Article;
