import RegisterForm from '@widgets/RegisterForm/RegisterForm';
import { AuthContainer, FormContainer, FormHeader} from '@shared/AuthContainer/ui/styled';

const Register = () => {

  return (
    <AuthContainer>
      <FormContainer>
        <FormHeader>
          <h2>User Register</h2>
        </FormHeader>
        <RegisterForm />
      </FormContainer>
    </AuthContainer>
  );
};

export default Register;