import React from "react";
import "./MySubscription.scss";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const MySubscription: React.FC = () => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate("/subscription");
  };

  return (
    <div className="my-subscription">
      <div className="my-subscription__title">
        <h1>My Subscription</h1>
      </div>
      <div className="my-subscription__content">
        <h3>Standard Subscription</h3>
        <h3>Status : waiting payment</h3>
      </div>
      <div className="my-subscription__button">
        <Button
          label="Back"
          className="profile-button"
          onClickHandler={backClickHandler}
        />
      </div>
    </div>
  );
};

export default MySubscription;
