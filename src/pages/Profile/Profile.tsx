import React, { useEffect } from "react";
import "./Profile.scss";
import useFetchGet from "../../hooks/UseFetchGet";
import { GetCookie } from "../../utils/Cookies/Cookies";
import { UserProfileDTO } from "../../constant/User";
import { notifyError } from "../../components/atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/UserSlice";
import { RootState } from "../../store/IndexStore";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const token = GetCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { out, error } = useFetchGet<{
    data: UserProfileDTO;
  }>(`http://localhost:8000/profile`, token);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      dispatch(userActions.setUser(out.data));
    }

    console.log("OUT : ", out);
    console.log("USER : ", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const handleReferralClick = () => {
    navigate("/profile/referral");
  };
  const handleVoucherClick = () => {
    navigate("/profile/voucher");
  };
  const handleGiftClick = () => {
    navigate("/profile/gift");
  };

  return (
    <div className="profile">
      <div className="profile__title">
        <h1>My Profile</h1>
      </div>
      <div className="profile__content">
        <div className="profile__content__container">
          <h3>Name</h3>
          <div>
            <h3>{user.name}</h3>
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Email</h3>
          <div>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Phone</h3>
          <div>
            <h3>{user.phone}</h3>
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Address</h3>
          <div>
            <h3>{user.address}</h3>
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Quota</h3>
          <div>
            <h3>{user.quota}</h3>
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Referral Code</h3>
          <div>
            <h3>{user.referral}</h3>
          </div>
        </div>
      </div>
      <div className="profile__buttons">
        <Button
          label="Referral"
          className="profile-button"
          onClickHandler={handleReferralClick}
        />
        <Button
          label="Voucher"
          className="profile-button"
          onClickHandler={handleVoucherClick}
        />
        <Button
          label="Gift"
          className="profile-button"
          onClickHandler={handleGiftClick}
        />
      </div>
    </div>
  );
};

export default Profile;
