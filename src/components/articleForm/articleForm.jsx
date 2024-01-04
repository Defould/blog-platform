import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { clearStatus } from '../../slices/articlesSlice';

import styles from './articleForm.module.scss';

const ArticleForm = ({ title, onSubmitForm, article = {} }) => {
  const dispatch = useDispatch();
  const tags = article?.tagList?.map((tag) => ({
    name: tag,
  }));

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { tagList: tags },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  useState(() => {
    dispatch(clearStatus());
  });

  const onSubmit = (data) => {
    onSubmitForm({
      ...data,
      tagList: data.tagList.map((tagObject) => tagObject.name),
    });
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <form className={styles.form} action="create article" onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.form_label}>
          <span className={styles.form_placeholder}>Title</span>
          <input
            {...register('title', {
              required: 'Title is required',
              maxLength: { value: 50, message: 'Your tag must contain no more than 30 characters.' },
            })}
            className={`${styles.form_input} ${errors.title ? styles.form_input__error : ''}`}
            placeholder="Title"
            defaultValue={article.title ? article.title : ''}
          />
          <p className={styles.form_error}>{errors?.title?.message}</p>
        </label>

        <label className={styles.form_label}>
          <span className={styles.form_placeholder}>Short description</span>
          <input
            {...register('description', {
              required: 'Short description is required',
              maxLength: { value: 300, message: 'Your tag must contain no more than 30 characters.' },
            })}
            className={`${styles.form_input} ${errors.description ? styles.form_input__error : ''}`}
            placeholder="Short description"
            defaultValue={article.description ? article.description : ''}
          />
          <p className={styles.form_error}>{errors?.description?.message}</p>
        </label>

        <label className={styles.form_label}>
          <span className={styles.form_placeholder}>Text</span>
          <textarea
            {...register('body', {
              required: 'Text is required',
            })}
            className={`${styles.form_input} ${styles.form_input__text} ${errors.text ? styles.form_input__error : ''}`}
            placeholder="Text"
            defaultValue={article.body ? article.body : ''}
          />
          <p className={styles.form_error}>{errors?.text?.message}</p>
        </label>

        <div className={styles.tags_block}>
          <span className={styles.form_placeholder}>Tags</span>
          {fields.map((field, index) => (
            <div key={field.id} className={`${styles.tags_block_item}`}>
              <input
                {...register(`tagList.${index}.name`, {
                  required:
                    'Tag is required! If you do not want to provide the Tag, please delete the tag before sending form!',
                  maxLength: { value: 30, message: 'Your tag must contain no more than 30 characters.' },
                })}
                className={`${styles.form_input} ${styles.form_input__tag}`}
                placeholder="Tag"
                defaultValue={field.tag}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className={`${styles.tag_button} ${styles.tag_button__delete}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <p className={styles.form_error}>{errors?.tagList?.message}</p>

        <button
          type="button"
          onClick={() => append({ name: '' })}
          className={`${styles.tag_button} ${styles.tag_button__add}`}
        >
          Add tag
        </button>

        <button className={styles.form_btn}>Send</button>
      </form>
    </div>
  );
};

export default ArticleForm;
