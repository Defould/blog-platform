import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { Spin } from 'antd';

import { signUpUser, clearError } from '../../slices/userSlice';

import styles from './signUp.module.scss';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.users);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    dispatch(signUpUser(userData));
    reset();
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const errorObj = JSON.parse(error).errors;

      if (errorObj.username) {
        setError('username', {
          type: 'server',
          message: 'Username is already taken',
        });
      }
      if (errorObj.email) {
        setError('email', {
          type: 'server',
          message: 'Email is already taken',
        });
      }
    }
  }, [error, setError]);

  if (token) {
    localStorage.setItem('Authorization', JSON.stringify(token));
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>Create new account</p>
      <form className={styles.form} action="registration_form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_textInputs}>
          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>Username</span>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be between 3 and 20 symbols' },
                maxLength: { value: 20, message: 'Username must be between 3 and 20 symbols' },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
              className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
              placeholder="Username"
            />
            <p className={styles.form_error}>
              {errors.username &&
                (errors?.username?.message || 'You can only use lowercase English letters and number')}
            </p>
          </label>

          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>Email address</span>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                  message: 'The email is no valid!',
                },
              })}
              className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
              placeholder="Email address"
            />
            <p className={styles.form_error}>{errors.email?.message}</p>
          </label>

          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>Password</span>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be between 6 and 40 symbols' },
                maxLength: { value: 40, message: 'Password must be between 6 and 40 symbols' },
              })}
              className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
              placeholder="Password"
              type="password"
            />
            <p className={styles.form_error}>{errors.password?.message}</p>
          </label>

          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>Repeat Password</span>
            <input
              {...register('repeat_password', {
                required: 'Passwords must match',
                validate: (value) => value === watch('password') || 'Passwords must match',
              })}
              className={`${styles.form_input} ${errors.username ? styles.form_input__error : ''}`}
              placeholder="Repeat Password"
              type="password"
            />
            <p className={styles.form_error}>{errors.repeat_password?.message}</p>
          </label>
        </div>

        <div className={styles.form_divider}></div>

        <label className={styles.form_label__checkbox}>
          <input
            {...register('checkbox', {
              required: 'You must give your consent to the processing of personal data',
            })}
            className={styles.form_checkbox}
            type="checkbox"
          />
          <span className={styles.custom_check}></span>
          <span className={styles.form_placeholder__checkbox}>
            I agree to the processing of my personal information
          </span>
        </label>
        <p className={styles.form_error}>{errors.checkbox?.message}</p>

        <button className={styles.form_btn}>Create</button>
        {isLoading && <Spin className={styles.spin} />}
      </form>

      <p className={styles.form_footer}>
        Already have an account?
        <Link className={styles.form_link} to={'/sign-in'}>
          Sign In.
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
