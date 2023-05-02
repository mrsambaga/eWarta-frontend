import React from "react";
import "./ContentBar.scss";
import premiumImg from "../../../img/premium.png";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const ContentBar: React.FC = () => {
  const navigate = useNavigate();
  const subscribeButtonHandler = () => {
    navigate("/subscribe");
  };

  return (
    <div className="content-bar">
      <div className="content-bar__bar">
        <div className="content-bar__bar__container">
          <div className="content-bar__bar__container__left">
            <h3>Read our high quality news</h3>
            <h3>VIP & PREMIUM</h3>
            <Button
              label="Subscribe"
              onClickHandler={subscribeButtonHandler}
              className="subscribe"
            />
          </div>
          <div className="content-bar__bar__container__right">
            <img src={premiumImg} alt="premium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBar;
