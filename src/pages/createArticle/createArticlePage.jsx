import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

import ArticleForm from '../../components/articleForm/articleForm';
import { createArticle } from '../../slices/articlesSlice';
import { clearError } from '../../slices/userSlice';

import styles from './createArticlePage.module.scss';

const CreateArticlePage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.articles);

  const onSubmit = ({ title, description, body, tagList }) => {
    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    dispatch(createArticle(articleData));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className={styles.container}>
      {isLoading && <Spin />}
      <ArticleForm title={'Create new article'} onSubmitForm={(data) => onSubmit(data)} />
    </div>
  );
};

export default CreateArticlePage;
