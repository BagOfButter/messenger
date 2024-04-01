import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInput } from "@widgets/LoginForm/models/types";
import { useAppDispatch } from "@shared/useAppDispatch/useAppDispatch";
import { loginUser } from "@widgets/LoginForm/api/login";
import { loadSettings } from "@widgets/LoginForm/api/loadSettings";
import { authActions } from "@features/authorization/models/actions";
import { useNavigate } from "react-router-dom";
import { userActions } from "@features/user/models/actions";
import { settingsActions } from "@features/settings/models/actions";
import { LoginSchema } from "@lib/schema";
import {
  StyledForm,
  StyledFormInput,
  StyledFormLabel,
  StyledFormError,
  StyledSubmitButton,
  StyledAuthChangeButton,
  StyledFormField,
} from "@shared/AuthForm/ui/styled";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = await loginUser(data);
      const { userId, username, accessToken } = response.data;
      if (accessToken) {
        dispatch(authActions.login(accessToken));
        dispatch(userActions.setUser({ userId: userId, username: username }));

        const settings = await loadSettings(userId);
        const { colorTheme, fontSize } = settings.data;

        dispatch(
          settingsActions.setSettings({
            colorTheme: colorTheme,
            fontSize: fontSize,
          })
        );

        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.message === "User not found") {
        setError("email", { message: error.response.data.message });
      }
      if (
        error.response &&
        error.response.data.message === "Invalid password"
      ) {
        setError("password", { message: error.response.data.message });
      }
    }
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFormLabel>
        <StyledFormField>
          Email
          <Controller
            name="email"
            control={control}
            render={({ field }) => <StyledFormInput {...field} type="text" />}
          />
        </StyledFormField>
        {emailError && <StyledFormError>{emailError}</StyledFormError>}
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

      <StyledSubmitButton type="submit">Login</StyledSubmitButton>
      <StyledAuthChangeButton onClick={() => navigate("/register")}>
        Create new account
      </StyledAuthChangeButton>
    </StyledForm>
  );
};

export default LoginForm;
