import React from "react";
import Card from "../../components/organisms/Card/Card";
import { FormProps } from "../../constant/FormProps";
import { ButtonProps } from "../../constant/ButtonProps";

const Login: React.FC = () => {
  const loginHandler = () => {
    return;
  };

  const loginForms: FormProps[] = [
    { placeholder: "Email Address", inputType: "text", className: "auth-form" },
    { placeholder: "Password", inputType: "password", className: "auth-form" },
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
