import Form from '../../components/form/form';

const SignUpPage = () => {
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
    />
  );
};

export default SignUpPage;
