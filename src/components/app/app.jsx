import { Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import ArticlesList from '../articlesList/articlesList';
import Article from '../article/article';

import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app_container}>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;