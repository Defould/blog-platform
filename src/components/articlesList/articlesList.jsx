import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import { Pagination, Spin, Alert } from 'antd';

import { fetchArticles } from '../../slices/articlesSlice';
import ArticleItem from '../articleItem/articleItem';

import styles from './articlesList.module.scss';

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.articles);
  const { articlesData } = useSelector((state) => state.articles);
  const { error } = useSelector((state) => state.articles);
  const { articlesCount } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage * 5 - 5));
  }, [dispatch, searchParams]);

  const onChangePage = (page) => {
    dispatch(fetchArticles(page * 5 - 5));
    setSearchParams({ page });
  };

  const articles = articlesData.map((article) => (
    <li key={nanoid()} className={styles.list_item}>
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
          defaultCurrent={1}
          current={currentPage}
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
