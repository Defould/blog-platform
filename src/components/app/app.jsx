import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Header from '../header/header';
import ArticlesList from '../articlesList/articlesList';
import Article from '../article/article';
import SignUpPage from '../../pages/signUp/signUpPage';
import SignInPage from '../../pages/signIn/signInPage';
import ProfilePage from '../../pages/editProfile/editProfilePage';
import NotFoundPage from '../../pages/notFound/notFound';
import { getCurrentUser } from '../../slices/userSlice';

import styles from './app.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Authorization'));
    if (token) dispatch(getCurrentUser(token));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app_container}>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
