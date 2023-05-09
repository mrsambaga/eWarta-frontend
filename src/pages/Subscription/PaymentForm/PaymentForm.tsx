import React, { useEffect, useState } from "react";
import Form from "../../../components/atoms/Form/Form";
import "./PaymentForm.scss";
import Button from "../../../components/atoms/Button/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/atoms/Modal/Modal";
import useFetchPost from "../../../hooks/UseFetchPost";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import { EditTransactionRequestDTO } from "../../../constant/Transaction";
import { notifyError } from "../../../components/atoms/Toastify/Toastify";
import { ToastContainer } from "react-toastify";

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const token = GetCookie("token");
  const [amount, setAmount] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const handleSubmitClick = () => {
    setSubmit(true);
  };

  const [submit, setSubmit] = useState<boolean>(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal(false);
  };

  const handleTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setAmount(value);
  };

  useEffect(() => {
    if (location.state && location.state.showModal) {
      setShowModal(true);
    }
  }, [location.state]);

  const body: EditTransactionRequestDTO = {
    total: amount,
    transactionId: parseInt(id ? id : "0"),
  };

  const { out, error } = useFetchPost(
    ApiUrl + "/transaction",
    body,
    submit,
    () => setSubmit(false),
    token,
    undefined,
    "put"
  );

  useEffect(() => {
    console.log(out, error);
    if (error != null) {
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      navigate("/subscription/my-subscription");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  return (
    <div className="payment">
      {showModal ? (
        <div id={showModal ? "modal-active" : ""}>
          <Modal
            qrOnClick={toggleModal}
            label="QR Code"
            transactionId={id ? id : "not-found"}
          />
        </div>
      ) : (
        <>
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
              value={amount}
              onChangeProp={handleTotalChange}
            />
          </div>
          <div className="payment__button">
            <Button
              label="Submit"
              onClickHandler={handleSubmitClick}
              className="profile-button"
            />
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default PaymentForm;
