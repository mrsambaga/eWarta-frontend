import React from "react";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import "./HomeSubscription.scss";

const HomeSubcsription: React.FC = () => {
  const navigate = useNavigate();
  const handlePurchaseClick = () => {
    navigate("/subscription/purchase");
  };
  const handleMySubsriptionClick = () => {
    navigate("/subscription/my-subscription");
  };

  return (
    <div className="home-subscription">
      <div className="home-subscription__purchase">
        <Button
          label="Purchase Subscription"
          className="subscription-button"
          onClickHandler={handlePurchaseClick}
        />
        <Button
          label="My Subscription"
          className="subscription-button"
          onClickHandler={handleMySubsriptionClick}
        />
      </div>
    </div>
  );
};

export default HomeSubcsription;
