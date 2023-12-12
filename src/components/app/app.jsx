import { Pagination } from 'antd';

import Header from '../header/header';
import ArticlesList from '../articlesList/articlesList';

import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app_container}>
        <ArticlesList />
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default App;
