import ArticleForm from '../../components/articleForm/articleForm';

import styles from './createArticlePage.module.scss';

const CreateArticlePage = () => {
  return (
    <div className={styles.container}>
      <ArticleForm title={'Create new article'} />
    </div>
  );
};

export default CreateArticlePage;
