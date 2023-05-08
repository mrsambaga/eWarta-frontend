import React, { useState } from "react";
import "./PurchaseSubscription.scss";
import Button from "../../../components/atoms/Button/Button";
import Form from "../../../components/atoms/Form/Form";
import { notifyError } from "../../../components/atoms/Toastify/Toastify";
import { ToastContainer } from "react-toastify";
import Modal from "../../../components/atoms/Modal/Modal";

const PurchaseSubscription: React.FC = () => {
  const [subscriptionId, setSubscriptionId] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleCheckoutClick = () => {
    if (subscriptionId === 0) {
      notifyError("Please select the subscription type");
      return;
    }
    setSuccess(true);
  };

  const handlerItemClick = (index: number) => {
    setSelectedItem(index);
    setSubscriptionId(index);
  };

  const itemClassName = (index: number) => {
    if (selectedItem === index) {
      return "purchase-subscription__content__item--selected";
    } else {
      return "purchase-subscription__content__item";
    }
  };

  const toggleModal = () => {
    setSuccess(false);
  };

  return (
    <div className="purchase-subscription">
      {success ? (
        <div id={success ? "modal-active" : ""}>
          <Modal toggleSuccess={toggleModal} label="QR Code" />
        </div>
      ) : (
        <>
          <div className="purchase-subscription__title">
            <h1>Purchase Subscription</h1>
          </div>
          <div className="purchase-subscription__content">
            <div
              className={itemClassName(3)}
              onClick={() => handlerItemClick(3)}
            >
              <h3>Gold (20 Quota)</h3>
              <div>
                <h3>Rp 90.000,00</h3>
              </div>
            </div>
            <div
              className={itemClassName(2)}
              onClick={() => handlerItemClick(2)}
            >
              <h3>Premium (10 Quota)</h3>
              <div>
                <h3>Rp 50.000,00</h3>
              </div>
            </div>
            <div
              className={itemClassName(1)}
              onClick={() => handlerItemClick(1)}
            >
              <h3>Standard (5 Quota)</h3>
              <div>
                <h3>Rp 30.000,00</h3>
              </div>
            </div>
          </div>
          <div className="purchase-subscription__summary">
            <h3>
              Subtotal :{" "}
              {selectedItem === 3
                ? "Rp 90.000,00"
                : selectedItem === 2
                ? "Rp 50.000,00"
                : selectedItem === 1
                ? "Rp 30.000,00"
                : "0"}
            </h3>
            <Form
              placeholder="Voucher Code (optional)"
              inputType="text"
              name="voucher"
              value={voucherCode}
              validate={false}
              className="voucher-form"
            />
          </div>
          <div className="purchase-subscription__button">
            <Button
              label="Checkout"
              className="profile-button"
              onClickHandler={handleCheckoutClick}
            />
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default PurchaseSubscription;
