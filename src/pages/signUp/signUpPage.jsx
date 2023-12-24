import Form from '../../components/form/form';

const SignUpPage = () => {
  return (
    <Form
      header={'Create new account'}
      username={'Username'}
      email={'Email address'}
      password={'Password'}
      repeatPass={'Repeat Password'}
      checkbox={true}
      btn={'Create'}
      link={'Sign In'}
    />
  );
};

export default SignUpPage;
