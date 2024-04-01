import LoginForm from '@widgets/LoginForm/LoginForm';
import { AuthContainer, FormContainer, FormHeader } from '@shared/AuthContainer/ui/styled';

const Login = () => {

  return (
      <AuthContainer>
        <FormContainer>
          <FormHeader>
            <h2>User Login</h2>
          </FormHeader>
          <LoginForm />
        </FormContainer>
      </AuthContainer>
  );
};

export default Login;