import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin, Alert } from 'antd';

import { fetchArticles, changePage } from '../../slices/articlesSlice';
import ArticleItem from '../articleItem/articleItem';

import styles from './articlesList.module.scss';

const ArticlesList = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.articles);
  const { articlesData } = useSelector((state) => state.articles);
  const { error } = useSelector((state) => state.articles);
  const { currPage } = useSelector((state) => state.articles);
  const { articlesCount } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const onChangePage = (page) => {
    dispatch(fetchArticles(page * 5 - 5));
    dispatch(changePage(page));
  };

  let id = 0;
  const articles = articlesData.map((article) => (
    <li key={id++} className={styles.list_item}>
      <ArticleItem
        slug={article.slug}
        title={article.title}
        description={article.description}
        tagList={article.tagList}
        createdAt={article.createdAt}
        author={article.author}
        favoritesCount={article.favoritesCount}
      />
    </li>
  ));

  return (
    <ul className={styles.list}>
      {isLoading && <Spin size="large" />}
      {articlesData && articles}
      {error && <Alert message={error} type="error" />}
      {articlesData.length > 0 && (
        <Pagination
          defaultCurrent={currPage}
          total={articlesCount}
          defaultPageSize={5}
          showSizeChanger={false}
          onChange={(page) => onChangePage(page)}
        />
      )}
    </ul>
  );
};

export default ArticlesList;
