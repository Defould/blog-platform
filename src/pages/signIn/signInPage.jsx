import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { Spin } from 'antd';

import { signInUser, clearError } from '../../slices/userSlice';

import styles from './signIn.module.scss';

const SignInPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.users);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const userData = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    dispatch(signInUser(userData));
    reset();
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const errorObj = JSON.parse(error).errors;

      if (errorObj) {
        setError('email', {
          type: 'server',
          message: 'Email or password is invalid',
        });
      }
      if (errorObj) {
        setError('password', {
          type: 'server',
          message: 'Email or password is invalid',
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
      <p className={styles.header}>Sign In</p>
      <form className={styles.form} action="registration_form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_textInputs}>
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
              className={`${styles.form_input} ${errors.email ? styles.form_input__error : ''}`}
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
              className={`${styles.form_input} ${errors.password ? styles.form_input__error : ''}`}
              placeholder="Password"
              type="password"
            />
            <p className={styles.form_error}>{errors.password?.message}</p>
          </label>
        </div>

        <button className={styles.form_btn}>Login</button>
        {isLoading && <Spin className={styles.spin} />}
      </form>

      <p className={styles.form_footer}>
        Don’t have an account?
        <Link className={styles.form_link} to={'/sign-up'}>
          Sign Up.
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
