import Form from '../../components/form/form';

const SignInPage = () => {
  return (
    <Form
      header={'SignIn'}
      username={'Username'}
      password={'Password'}
      btn={'Login'}
      link={'../sign-up'}
      linkText={'Sign Up'}
      linkQuestion={'Don’t have an account? '}
    />
  );
};

export default SignInPage;
