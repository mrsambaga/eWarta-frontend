import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";
import QRCode from "react-qr-code";
import Button from "../Button/Button";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";

type CardProps = {
  qrOnClick: () => void;
  label: string;
  transactionId: string;
};

const Modal: React.FC<CardProps> = ({ qrOnClick, label, transactionId }) => {
  const navigate = useNavigate();
  const handleCloseClick = () => {
    navigate("/subscription/my-subscription");
  };

  const onClickQR = () => {
    qrOnClick();
  };

  return (
    <div className="qr-modal">
      <h3 className="qr-modal__title">{label}</h3>
      <div className="qr-modal__content">
        <div className="qr-modal__content__qr">
          <QRCode
            value={`${ApiUrl}/transaction/${transactionId}`}
            size={320}
            onClick={onClickQR}
          />
        </div>
        <div className="qr-modal__content__button">
          <Button
            label="Close"
            onClickHandler={handleCloseClick}
            className="profile-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
