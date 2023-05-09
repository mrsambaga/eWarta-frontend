import React, { useEffect, useState } from "react";
import "./PurchaseSubscription.scss";
import Button from "../../../components/atoms/Button/Button";
import Form from "../../../components/atoms/Form/Form";
import { notifyError } from "../../../components/atoms/Toastify/Toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetchPost from "../../../hooks/UseFetchPost";
import { TransactionRequestDTO } from "../../../constant/Transaction";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";
import { GetCookie } from "../../../utils/Cookies/Cookies";

const PurchaseSubscription: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [voucherCode] = useState<string>("");
  const navigate = useNavigate();
  const token = GetCookie("token");
  const [transactionRequest, setTransactionRequest] =
    useState<TransactionRequestDTO>({
      status: "waiting payment",
      total: 0,
      paymentDate: null,
      voucherId: 0,
      subscriptionId: 0,
    });

  const handleCheckoutClick = () => {
    if (transactionRequest.subscriptionId === 0) {
      notifyError("Please select the subscription type");
      return;
    }
    setSubmit(true);
  };

  const handlerItemClick = (index: number, total: number) => {
    const subscriptionIdKey = "subscriptionId";
    const totalKey = "total";
    setTransactionRequest({
      ...transactionRequest,
      [totalKey]: total,
      [subscriptionIdKey]: index,
    });

    setSelectedItem(index);
    console.log(transactionRequest);
  };

  const itemClassName = (index: number) => {
    if (selectedItem === index) {
      return "purchase-subscription__content__item--selected";
    } else {
      return "purchase-subscription__content__item";
    }
  };

  const [submit, setSubmit] = useState<boolean>(false);
  const { out, error } = useFetchPost(
    ApiUrl + "/transaction",
    transactionRequest,
    submit,
    () => setSubmit(false),
    token
  );

  useEffect(() => {
    if (error != null) {
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      navigate(`/subscription/purchase/payment/${out.data.transactionId}`, {
        state: { showModal: true },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  return (
    <div className="purchase-subscription">
      <div className="purchase-subscription__title">
        <h1>Purchase Subscription</h1>
      </div>
      <div className="purchase-subscription__content">
        <div
          className={itemClassName(3)}
          onClick={() => handlerItemClick(3, 90000)}
        >
          <h3>Gold (20 Quota)</h3>
          <div>
            <h3>Rp 90.000,00</h3>
          </div>
        </div>
        <div
          className={itemClassName(2)}
          onClick={() => handlerItemClick(2, 50000)}
        >
          <h3>Premium (10 Quota)</h3>
          <div>
            <h3>Rp 50.000,00</h3>
          </div>
        </div>
        <div
          className={itemClassName(1)}
          onClick={() => handlerItemClick(1, 30000)}
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
    </div>
  );
};

export default PurchaseSubscription;
