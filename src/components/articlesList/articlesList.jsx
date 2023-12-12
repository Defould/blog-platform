import ArticleItem from '../articleItem/artcleItem';

import styles from './articlesList.module.scss';

const ArticlesList = () => {
  return (
    <div className={styles.list}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
  );
};

export default ArticlesList;
