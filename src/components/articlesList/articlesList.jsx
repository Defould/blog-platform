import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import { Pagination, Spin, Alert } from 'antd';

import { fetchArticles } from '../../slices/articlesSlice';
import ArticleItem from '../articleItem/articleItem';

import styles from './articlesList.module.scss';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.articles);
  const { articlesData } = useSelector((state) => state.articles);
  const { error } = useSelector((state) => state.articles);
  const { articlesCount } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage * 5 - 5));
  }, [dispatch, currentPage]);

  useEffect(() => {
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
          favorited={article.favorited}
        />
      </li>
    ));
    setArticles(articles);
  }, [articlesData, setArticles, isLoading]);

  const onChangePage = (page) => {
    dispatch(fetchArticles(page * 5 - 5));
    setSearchParams({ page });
  };

  return (
    <ul className={styles.list}>
      {error && <Alert className={styles.alert} message={error} type="error" />}
      {isLoading && <Spin size="large" />}
      {articlesData && articles}
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
