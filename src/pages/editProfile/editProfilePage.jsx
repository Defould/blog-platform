import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { editUser } from '../../slices/userSlice';

import styles from './editProfile.module.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.users);
  const { email } = useSelector((state) => state.users);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.image,
      },
    };
    dispatch(editUser(userData));
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>Edit Profile</p>
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
              defaultValue={username}
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
              className={`${styles.form_input} ${errors.email ? styles.form_input__error : ''}`}
              placeholder="Email address"
              defaultValue={email}
            />
            <p className={styles.form_error}>{errors.email?.message}</p>
          </label>

          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>New password</span>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be between 6 and 40 symbols' },
                maxLength: { value: 40, message: 'Password must be between 6 and 40 symbols' },
              })}
              className={`${styles.form_input} ${errors.password ? styles.form_input__error : ''}`}
              placeholder="New password"
              type="password"
            />
            <p className={styles.form_error}>{errors.password?.message}</p>
          </label>

          <label className={styles.form_label}>
            <span className={styles.form_placeholder}>Avatar image (url)</span>
            <input
              {...register('image', {
                required: 'Password is required',
                pattern: {
                  value: /^(http|https):\/\/[^ "]+$/,
                  message: 'Invalid URL format',
                },
              })}
              className={`${styles.form_input} ${errors.image ? styles.form_input__error : ''}`}
              placeholder="Avatar image"
            />
            <p className={styles.form_error}>{errors.image?.message}</p>
          </label>
        </div>

        <button className={styles.form_btn}>Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
