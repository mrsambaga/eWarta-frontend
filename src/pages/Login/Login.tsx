import React, { useEffect, useState } from "react";
import Card from "../../components/organisms/Card/Card";
import { FormProps } from "../../constant/FormProps";
import { ButtonProps } from "../../constant/ButtonProps";
import useFetchPost from "../../hooks/UseFetchPost";
import { SetCookie } from "../../utils/Cookies/Cookies";
import { notifyError } from "../../components/atoms/Toastify/Toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { loginFormActions } from "../../store/LoginFormSlice";
import { RootState } from "../../store/Index";
import { LoginForm } from "../../constant/FormProps";

const Login: React.FC = () => {
  const formData = useSelector((state: RootState) => state.loginForm);
  const { email, password } = formData;

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = () => {
    if (!submit) {
      setSubmit(true);
    }
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
      console.log(error.response.data.message);
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      console.log(out.data);
      SetCookie("token", out.data.token, 1);
      dispatch(authActions.login);
      navigate(`/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const loginForms: FormProps[] = [
    {
      placeholder: "Email Address",
      inputType: "text",
      className: "auth-form",
      onChangeProp: handleLoginFormChange,
      value: email,
      name: "email",
    },
    {
      placeholder: "Password",
      inputType: "password",
      className: "auth-form",
      onChangeProp: handleLoginFormChange,
      value: password,
      name: "password",
    },
  ];

  const loginButton: ButtonProps = {
    label: "Login",
    onClickHandler: loginHandler,
    className: "login",
  };

  return (
    <Card
      title="Login"
      subTitle="Login to your eWarta account"
      detail="Don't have an account ? Register"
      forms={loginForms}
      button={loginButton}
    />
  );
};

export default Login;
