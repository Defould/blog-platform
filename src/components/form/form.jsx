import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import styles from './form.module.scss';

const Form = ({ header, username, email, password, repeatPass, btn, link, linkText, avatarUrl, divider, checkbox }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>{header}</p>
      <form className={styles.form} action="registration_form">
        <div className={styles.form_textInputs}>
          {username && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{username}</span>
              <input className={styles.form_input} type="text" placeholder={username} />
            </label>
          )}

          {email && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{email}</span>
              <input className={styles.form_input} type="text" placeholder={email} />
            </label>
          )}
          {password && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{password}</span>
              <input className={styles.form_input} type="text" placeholder={password} />
            </label>
          )}
          {repeatPass && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{repeatPass}</span>
              <input className={styles.form_input} type="text" placeholder={repeatPass} />
            </label>
          )}
          {avatarUrl && (
            <label className={styles.form_label}>
              <span className={styles.form_placeholder}>{avatarUrl} (url)</span>
              <input className={styles.form_input} type="text" placeholder={avatarUrl} />
            </label>
          )}
        </div>

        {divider && <div className={styles.form_divider}></div>}

        {checkbox && (
          <label className={styles.form_label__checkbox}>
            <Checkbox></Checkbox>
            <span className={styles.form_placeholder__checkbox}>
              I agree to the processing of my personal information
            </span>
          </label>
        )}

        <button className={styles.form_btn}>{btn}</button>
      </form>
      {link && (
        <p className={styles.form_footer}>
          Already have an account?{' '}
          <Link className={styles.form_link} to={link}>
            {linkText}
          </Link>
        </p>
      )}
    </div>
  );
};

export default Form;
