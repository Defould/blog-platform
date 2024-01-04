import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import ArticleForm from '../../components/articleForm/articleForm';
import { createArticle } from '../../slices/articlesSlice';
import { clearError } from '../../slices/userSlice';

import styles from './createArticlePage.module.scss';

const CreateArticlePage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.articles);
  const { error } = useSelector((state) => state.articles);
  const { status } = useSelector((state) => state.articles);

  const { setError } = useForm({ mode: 'onChange' });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  useEffect(() => {
    if (error) {
      const errorObj = JSON.parse(error).errors;

      if (errorObj.title) {
        setError('title', {
          type: 'server',
          message: 'Something went wrong with title',
        });
      }
      if (errorObj.description) {
        setError('description', {
          type: 'server',
          message: 'Something went wrong with description',
        });
      }
      if (errorObj.text) {
        setError('text', {
          type: 'server',
          message: 'Something went wrong with text',
        });
      }
      if (errorObj.tagList) {
        setError('tagList', {
          type: 'server',
          message: 'Something went wrong with tags',
        });
      }
    }
  }, [error, setError]);

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

  return (
    <div className={styles.container}>
      {isLoading && <Spin className={styles.spin} />}
      {status && <Alert className={styles.alert} message="Successfully" type="success" showIcon closable />}
      {error && <Alert className={styles.alert} message={error} type="error" showIcon closable />}
      <ArticleForm title={'Create new article'} onSubmitForm={(data) => onSubmit(data)} />
    </div>
  );
};

export default CreateArticlePage;
