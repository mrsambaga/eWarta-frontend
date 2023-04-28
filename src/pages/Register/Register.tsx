import React from "react";
import { FormProps } from "../../constant/FormProps";
import { ButtonProps } from "../../constant/ButtonProps";
import Card from "../../components/organisms/Card/Card";

const Register: React.FC = () => {
  const registerForms: FormProps[] = [
    { placeholder: "Name", inputType: "text", className: "auth-form" },
    { placeholder: "Email Address", inputType: "text", className: "auth-form" },
    { placeholder: "Password", inputType: "password", className: "auth-form" },
    {
      placeholder: "Password Confirm",
      inputType: "password",
      className: "auth-form",
    },
    { placeholder: "Phone", inputType: "text", className: "auth-form" },
    { placeholder: "Address", inputType: "text", className: "auth-form" },
  ];

  const registerHandler = () => {
    return;
  };

  const registerButton: ButtonProps = {
    label: "Register",
    onClickHandler: registerHandler,
    className: "login",
  };

  return (
    <Card
      title="Register"
      subTitle="Create your eWarta account"
      detail="Already have an account ? Log in. "
      forms={registerForms}
      button={registerButton}
    />
  );
};

export default Register;