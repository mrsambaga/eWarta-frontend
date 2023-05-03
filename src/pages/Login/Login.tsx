import React, { useEffect, useState } from "react";
import Card from "../../components/organisms/Card/Card";
import { FormProps } from "../../constant/FormProps";
import { ButtonProps } from "../../constant/ButtonProps";
import useFetchPost from "../../hooks/UseFetchPost";
import {
  NotifContainer,
  notifyError,
} from "../../components/atoms/Toastify/Toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { loginFormActions } from "../../store/LoginFormSlice";
import { RootState } from "../../store/Index";
import { LoginForm } from "../../constant/FormProps";
import { loginSchema } from "../../utils/Validation/LoginValidation";

const Login: React.FC = () => {
  const { email, password } = useSelector(
    (state: RootState) => state.loginForm
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = () => {
    loginSchema
      .validate(body)
      .then(() => {
        setSubmit(true);
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  const handleLoginFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    dispatch(loginFormActions.updateLoginForm({ name, value }));
  };

  const body: LoginForm = {
    email: email,
    password: password,
  };

  const { out, error } = useFetchPost(
    "http://localhost:8000/login",
    body,
    submit,
    () => setSubmit(false)
  );

  useEffect(() => {
    if (error != null) {
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      const token = out.data.token;
      const expiredHour = 1;
      dispatch(authActions.login({ token, expiredHour }));
      navigate(`/`);
    }
  }, [out, error, dispatch, navigate]);

  const loginForms: FormProps[] = [
    {
      placeholder: "Email Address",
      inputType: "text",
      className: "auth-form",
      onChangeProp: handleLoginFormChange,
      value: email,
      name: "email",
      validate: true,
    },
    {
      placeholder: "Password",
      inputType: "password",
      className: "auth-form",
      onChangeProp: handleLoginFormChange,
      value: password,
      name: "password",
      validate: true,
    },
  ];

  const loginButton: ButtonProps = {
    label: "Login",
    onClickHandler: handleLoginSubmit,
    className: "login",
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <>
          <Card
            title="Login"
            subTitle="Login to your eWarta account"
            detail="Don't have an account ? Register"
            forms={loginForms}
            button={loginButton}
          />
          <NotifContainer />
        </>
      )}
    </>
  );
};

export default Login;
