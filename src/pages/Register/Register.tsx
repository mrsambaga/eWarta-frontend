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
import { registerSchema } from "../../utils/Validation/RegisterValidation";

const Register: React.FC = () => {
  const { name, email, password, passwordConfirm, phone, address, referral } =
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
      value: name,
      validate: true,
    },
    {
      placeholder: "Email Address",
      inputType: "text",
      className: "auth-form",
      name: "email",
      onChangeProp: handleRegisterFormChange,
      value: email,
      validate: true,
    },
    {
      placeholder: "Password",
      inputType: "password",
      className: "auth-form",
      name: "password",
      onChangeProp: handleRegisterFormChange,
      value: password,
      validate: true,
    },
    {
      placeholder: "Password Confirm",
      inputType: "password",
      className: "auth-form",
      name: "passwordConfirm",
      onChangeProp: handleRegisterFormChange,
      value: passwordConfirm,
      validate: true,
    },
    {
      placeholder: "Phone",
      inputType: "text",
      className: "auth-form",
      name: "phone",
      onChangeProp: handleRegisterFormChange,
      value: phone,
      validate: true,
    },
    {
      placeholder: "Address",
      inputType: "text",
      className: "auth-form",
      name: "address",
      onChangeProp: handleRegisterFormChange,
      value: address,
      validate: true,
    },
    {
      placeholder: "Referral (optional)",
      inputType: "text",
      className: "auth-form",
      name: "referral",
      onChangeProp: handleRegisterFormChange,
      value: referral,
      validate: false,
    },
  ];

  const body: RegisterForm = {
    name: name,
    email: email,
    password: password,
    password_confirm: passwordConfirm,
    phone: phone,
    address: address,
    ref_referral: referral,
  };

  const { out, error } = useFetchPost(
    "http://localhost:8000/register",
    body,
    submit,
    () => setSubmit(false)
  );

  useEffect(() => {
    console.log(out);
    if (error != null) {
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      if (out.code === "ERROR_CREATED") {
        notifyError(out.message);
        return;
      }
      notifySuccess(out.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const submitHandler = () => {
    registerSchema
      .validate(body)
      .then(() => {
        setSubmit(true);
      })
      .catch((error) => {
        notifyError(error.message);
      });
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
