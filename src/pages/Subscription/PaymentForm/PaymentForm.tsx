import React, { useState } from "react";
import Form from "../../../components/atoms/Form/Form";
import "./PaymentForm.scss";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const [amount] = useState<number | null>(null);

  const handleSubmitClick = () => {
    navigate("/subscription/my-subscription");
  };

  return (
    <div className="payment">
      <div className="payment__title">
        <h1>Payment Form</h1>
      </div>
      <div className="payment__content">
        <h3>Enter Amount</h3>
        <Form
          placeholder="ex : 150000"
          inputType="number"
          name="payment"
          validate={false}
          className="auth-form"
          value={amount!}
        />
      </div>
      <div className="payment__button">
        <Button
          label="Submit"
          onClickHandler={handleSubmitClick}
          className="profile-button"
        />
      </div>
    </div>
  );
};

export default PaymentForm;
