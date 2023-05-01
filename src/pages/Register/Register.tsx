import React, { useEffect } from "react";
import { FormProps, RegisterForm } from "../../constant/FormProps";
import { ButtonProps } from "../../constant/ButtonProps";
import Card from "../../components/organisms/Card/Card";
import { RootState } from "../../store/Index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerFormActions } from "../../store/RegisterFormSlice";
import {
  NotifContainer,
  notifyError,
  notifySuccess,
} from "../../components/atoms/Toastify/Toastify";
import useFetchPost from "../../hooks/UseFetchPost";
import { Navigate } from "react-router-dom";

const Register: React.FC = () => {
  const { name, email, password, passwordConfirm, phone, address } =
    useSelector((state: RootState) => state.registerForm);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleRegisterFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    dispatch(registerFormActions.updateRegisterForm({ name, value }));
  };

  const registerForms: FormProps[] = [
    {
      placeholder: "Name",
      inputType: "text",
      className: "auth-form",
      name: "name",
      onChangeProp: handleRegisterFormChange,
    },
    {
      placeholder: "Email Address",
      inputType: "text",
      className: "auth-form",
      name: "email",
      onChangeProp: handleRegisterFormChange,
    },
    {
      placeholder: "Password",
      inputType: "password",
      className: "auth-form",
      name: "password",
      onChangeProp: handleRegisterFormChange,
    },
    {
      placeholder: "Password Confirm",
      inputType: "password",
      className: "auth-form",
      name: "passwordConfirm",
      onChangeProp: handleRegisterFormChange,
    },
    {
      placeholder: "Phone",
      inputType: "text",
      className: "auth-form",
      name: "phone",
      onChangeProp: handleRegisterFormChange,
    },
    {
      placeholder: "Address",
      inputType: "text",
      className: "auth-form",
      name: "address",
      onChangeProp: handleRegisterFormChange,
    },
  ];

  const body: RegisterForm = {
    name: name,
    email: email,
    password: password,
    password_confirm: passwordConfirm,
    phone: phone,
    address: address,
  };

  const { out, error } = useFetchPost(
    "http://localhost:8000/register",
    body,
    submit,
    () => setSubmit(false)
  );

  useEffect(() => {
    if (error != null) {
      console.log(error.response.data.message);
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      notifySuccess(out.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const submitHandler = () => {
    console.log(name, email, password, passwordConfirm, phone, address);
    if (!submit) {
      setSubmit(true);
    }
  };

  const registerButton: ButtonProps = {
    label: "Register",
    onClickHandler: submitHandler,
    className: "login",
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <>
          <Card
            title="Register"
            subTitle="Create your eWarta account"
            detail="Already have an account ? Log in. "
            forms={registerForms}
            button={registerButton}
          />
          <NotifContainer />
        </>
      )}
    </>
  );
};

export default Register;
