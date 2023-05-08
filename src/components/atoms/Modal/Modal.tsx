import React from "react";
import successLogo from "../img/icon-success.png";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";
import QRCode from "react-qr-code";
import Button from "../Button/Button";

type CardProps = {
  toggleSuccess: (success: boolean) => void;
  label: string;
};

const Modal: React.FC<CardProps> = ({ toggleSuccess, label }) => {
  const navigate = useNavigate();
  const onClickModal = () => {
    toggleSuccess(false);
  };

  const onClickQR = () => {
    navigate("/subscription");
  };

  return (
    <div className="qr-modal">
      <h3 className="qr-modal__title">{label}</h3>
      <div className="qr-modal__content">
        <div className="qr-modal__content__qr">
          <QRCode value={"www.google.com"} size={320} onClick={onClickQR} />
        </div>
        <div className="qr-modal__content__button">
          <Button
            label="Close"
            onClickHandler={onClickModal}
            className="profile-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
