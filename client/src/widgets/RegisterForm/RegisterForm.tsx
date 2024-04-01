import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormInput } from '@widgets/RegisterForm/models/types';
import { registerUser } from '@widgets/RegisterForm/api/register';
import { useNavigate } from 'react-router-dom';
import { RegisterSchema } from '@lib/schema';
import { StyledForm,
         StyledFormInput,
         StyledFormLabel,
         StyledFormError,
         StyledSubmitButton,
         StyledAuthChangeButton, 
         StyledFormField } from '@shared/AuthForm/ui/styled';
  
const RegisterFrom: React.FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<RegisterFormInput>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(RegisterSchema)
  });

  const navigate = useNavigate();
    
  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      const { repeatPasswordData, ...submitData } = data;
      const response = await registerUser(submitData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const emailError = errors.email?.message;
  const usernameError = errors.username?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;
  
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFormLabel>
        <StyledFormField>
          Email
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <StyledFormInput {...field} type="text" />
            )}
          />
        </StyledFormField>
        {emailError && <StyledFormError>{emailError}</StyledFormError>}
      </StyledFormLabel>

      <StyledFormLabel>
        <StyledFormField>
          Username
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <StyledFormInput {...field} type="text" />
            )}
          />
        </StyledFormField>
        {usernameError && <StyledFormError>{usernameError}</StyledFormError>}
      </StyledFormLabel>

      <StyledFormLabel>
        <StyledFormField>
          Password
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <StyledFormInput {...field} type="password" />
            )}
          />
        </StyledFormField>
        {passwordError && <StyledFormError>{passwordError}</StyledFormError>}
      </StyledFormLabel>

      <StyledFormLabel>
        <StyledFormField>
          Repeat Password
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <StyledFormInput {...field} type="password" />
            )}
          />
        </StyledFormField>
        {repeatPasswordError && <StyledFormError>{repeatPasswordError}</StyledFormError>}
      </StyledFormLabel>

      <StyledSubmitButton type="submit">Register</StyledSubmitButton>
      <StyledAuthChangeButton onClick={() => navigate("/login")}>Login to your account</StyledAuthChangeButton>
    </StyledForm>
  );
};

export default RegisterFrom;