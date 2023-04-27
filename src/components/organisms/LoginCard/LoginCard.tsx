import React from "react";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import "./LoginCard.scss";

const LoginCard = () => {
  const loginHandler = () => {
    return;
  };

  return (
    <div className="card">
      <h3 className="card__title">eWarta</h3>
      <div className="card__sub-title">
        <h3>Log in to your eWarta account</h3>
        <p>Don't have an account ? Register </p>
      </div>
      <div className="card__forms">
        <Form
          placeholder="Email Address"
          inputType="text"
          className="auth-form"
        />
        <Form placeholder="Password" inputType="text" className="auth-form" />
      </div>
      <Button label="Log In" onClickHandler={loginHandler} className="login" />
    </div>
  );
};

export default LoginCard;
