import React, { useEffect, useState } from "react";
import "./AdminLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/IndexStore";
import { Navigate, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../utils/Validation/LoginValidation";
import {
  NotifContainer,
  notifyError,
} from "../../../components/atoms/Toastify/Toastify";
import { loginFormActions } from "../../../store/LoginFormSlice";
import { FormProps, LoginForm } from "../../../constant/FormProps";
import useFetchPost from "../../../hooks/UseFetchPost";
import { ButtonProps } from "../../../constant/ButtonProps";
import Card from "../../../components/organisms/Card/Card";
import { adminAuthActions } from "../../../store/AdminAuthSlice";

const AdminLogin: React.FC = () => {
  const { email, password } = useSelector(
    (state: RootState) => state.loginForm
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isAdminAuthenticated } = useSelector(
    (state: RootState) => state.authAdmin
  );

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
    role: "admin",
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
      dispatch(adminAuthActions.login({ token, expiredHour }));
      navigate(`/admin/home`);
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
    <div className="admin-login">
      <div className="admin-login__container">
        {isAuthenticated ? (
          <Navigate to="/" replace />
        ) : isAdminAuthenticated ? (
          <Navigate to="/admin/home" replace />
        ) : (
          <>
            <Card
              title="Admin"
              subTitle="Login to Admin account"
              detail=""
              forms={loginForms}
              button={loginButton}
              className="admin-card"
            />
            <NotifContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
