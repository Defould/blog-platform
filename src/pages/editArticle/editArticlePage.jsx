import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import ArticleForm from '../../components/articleForm/articleForm';
import { fetchArticle, editArticle } from '../../slices/articlesSlice';
import { clearError } from '../../slices/userSlice';

import styles from './editArticlePage.module.scss';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { token } = useSelector((state) => state.users);
  const { article } = useSelector((state) => state.articles);
  const { isLoading } = useSelector((state) => state.articles);
  const { error } = useSelector((state) => state.articles);
  const { status } = useSelector((state) => state.articles);

  const { setError } = useForm({ mode: 'onChange' });
  const { slug } = params;

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch]);

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
    const article = {
      title,
      description,
      body,
      tagList,
    };
    console.log(article);
    dispatch(editArticle({ formData: article, slug }));
  };

  return (
    <div className={styles.container}>
      {isLoading && <Spin className={styles.spin} />}
      {status && <Alert className={styles.alert} message="Successfully" type="success" showIcon closable />}
      <ArticleForm title={'Edit article'} onSubmitForm={(data) => onSubmit(data)} article={article} />
    </div>
  );
};

export default EditArticlePage;
