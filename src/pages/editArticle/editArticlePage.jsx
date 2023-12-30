import ArticleForm from '../../components/articleForm/articleForm';

import styles from './editArticlePage.module.scss';

const EditArticlePage = () => {
  return (
    <div className={styles.container}>
      <ArticleForm title={'Edit article'} />
    </div>
  );
};

export default EditArticlePage;
