import React, { useEffect, useState } from "react";
import "./MySubscription.scss";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import useFetchGet from "../../../hooks/UseFetchGet";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import { notifyError } from "../../../components/atoms/Toastify/Toastify";
import { TransactionResponseDTO } from "../../../constant/Transaction";

const MySubscription: React.FC = () => {
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState<
    TransactionResponseDTO[]
  >([]);
  const backClickHandler = () => {
    navigate("/subscription");
  };

  const token = GetCookie("token");
  const { out, error } = useFetchGet<{
    data: TransactionResponseDTO[];
  }>(ApiUrl + "/transaction/user", token);

  useEffect(() => {
    if (error != null) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
    } else if (out != null && out.data != null) {
      console.log(out);
      setTransactionList(out.data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const onClickPayHandler = (transactionId: number) => {
    navigate(`/subscription/purchase/payment/${transactionId}`);
  };

  return (
    <div className="my-subscription">
      <div className="my-subscription__title">
        <h1>My Subscription</h1>
      </div>
      {transactionList.map((transaction) => (
        <div className="my-subscription__content">
          <h3>{transaction.subscription} Subscription</h3>
          <div className="my-subscription__content__right">
            {transaction.status === "waiting payment" ? (
              <Button
                label="Pay"
                className="payment-button"
                onClickHandler={() =>
                  onClickPayHandler(transaction.transactionId)
                }
              />
            ) : (
              <></>
            )}
            <h3>Status : {transaction.status}</h3>
          </div>
        </div>
      ))}
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
