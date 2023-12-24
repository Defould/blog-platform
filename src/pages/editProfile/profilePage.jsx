import Form from '../../components/form/form';

const ProfilePage = () => {
  return (
    <Form
      header={'Edit Profile'}
      username={'Username'}
      email={'Email address'}
      password={'New password'}
      avatarUrl={'Avatar image'}
      btn={'Save'}
    />
  );
};

export default ProfilePage;
