import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signUpUser } from '../../slices/userSlice';
import Form from '../../components/form/form';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { reset } = useForm();
  // const { user } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    dispatch(signUpUser(userData));
    console.log('before reset');
    reset();
    console.log('after reset');
  };

  return (
    <Form
      header={'Create new account'}
      username={'Username'}
      email={'Email address'}
      password={'Password'}
      repeatPass={'Repeat Password'}
      divider={true}
      checkbox={true}
      btn={'Create'}
      link={'../sign-in'}
      linkText={'Sign In'}
      linkQuestion={'Already have an account? '}
      onSubmit={(data) => onSubmit(data)}
    />
  );
};

export default SignUpPage;
