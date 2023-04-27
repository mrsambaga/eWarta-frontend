import React from "react";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import "./RegisterCard.scss";

const RegisterCard: React.FC = () => {
  const loginHandler = () => {
    return;
  };

  return (
    <div className="card">
      <h3 className="card__title">eWarta</h3>
      <div className="card__sub-title">
        <h3>Create your eWarta account</h3>
        <p>Already have an account ? Log in. </p>
      </div>
      <div className="card__forms">
        <Form placeholder="Name" inputType="text" className="auth-form" />
        <Form
          placeholder="Email Address"
          inputType="text"
          className="auth-form"
        />
        <Form placeholder="Password" inputType="text" className="auth-form" />
        <Form
          placeholder="Password Confirm"
          inputType="text"
          className="auth-form"
        />
        <Form placeholder="Phone" inputType="text" className="auth-form" />
        <Form placeholder="Address" inputType="text" className="auth-form" />
      </div>
      <Button
        label="Register"
        onClickHandler={loginHandler}
        className="login"
      />
    </div>
  );
};

export default RegisterCard;
