import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import styles from './form.module.scss';

const Form = ({
  header,
  username,
  email,
  password,
  repeatPass,
  btn,
  link,
  linkText,
  linkQuestion,
  avatarUrl,
  divider,
  checkbox,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>{header}</p>
      <form className={styles.form} action="registration_form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_textInputs}>
          {username && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{username}</span>
              <input
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be between 3 and 20 symbols' },
                  maxLength: { value: 20, message: 'Username must be between 3 and 20 symbols' },
                  pattern: {
                    value: /^[a-z0-9]+$/, ///^[a-z][a-z0-9]*$/,
                    message: 'You can only use lowercase English letters and numbers',
                  },
                })}
                className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
                placeholder={username}
              />
              <p className={styles.form_error}>{errors.username?.message}</p>
            </label>
          )}

          {email && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{email}</span>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                    message: 'The email is no valid!',
                  },
                })}
                className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
                placeholder={email}
              />
              <p className={styles.form_error}>{errors.email?.message}</p>
            </label>
          )}

          {password && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{password}</span>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be between 6 and 40 symbols' },
                  maxLength: { value: 40, message: 'Password must be between 6 and 40 symbols' },
                })}
                className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
                placeholder={password}
                type="password"
              />
              <p className={styles.form_error}>{errors.password?.message}</p>
            </label>
          )}

          {repeatPass && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{repeatPass}</span>
              <input
                {...register('repeat_password', {
                  required: 'Passwords must match',
                  validate: (value) => value === watch('password') || 'Passwords must match',
                })}
                className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
                placeholder={repeatPass}
                type="password"
              />
              <p className={styles.form_error}>{errors.repeat_password?.message}</p>
            </label>
          )}

          {avatarUrl && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{avatarUrl} (url)</span>
              <input
                {...register('image', {
                  pattern: {
                    value: /^(http|https):\/\/[^ "]+$/,
                    message: 'Invalid URL format',
                  },
                })}
                className={styles.form_input}
                placeholder={avatarUrl}
              />
              <p className={styles.form_error}>{errors.image?.message}</p>
            </label>
          )}
        </div>

        {divider && <div className={styles.form_divider}></div>}

        {checkbox && (
          <>
            <label className={styles.form_label__checkbox}>
              <input
                {...register('checkbox', {
                  required: 'You must give your consent to the processing of personal data',
                })}
                type="checkbox"
              />
              <span className={styles.form_placeholder__checkbox}>
                I agree to the processing of my personal information
              </span>
            </label>
            <p className={styles.form_error}>{errors.checkbox?.message}</p>
          </>
        )}

        <button className={styles.form_btn}>{btn}</button>
      </form>
      {link && (
        <p className={styles.form_footer}>
          {linkQuestion}
          <Link className={styles.form_link} to={link}>
            {linkText}
          </Link>
        </p>
      )}
    </div>
  );
};

export default Form;
