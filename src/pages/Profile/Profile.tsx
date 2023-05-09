import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useFetchGet from "../../hooks/UseFetchGet";
import { GetCookie } from "../../utils/Cookies/Cookies";
import { EditUserDTO, UserProfileDTO } from "../../constant/User";
import {
  notifyError,
  notifySuccess,
} from "../../components/atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/UserSlice";
import { RootState } from "../../store/IndexStore";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import Form from "../../components/atoms/Form/Form";
import { ApiUrl } from "../../utils/ApiUrl/ApiUrl";
import useFetchPost from "../../hooks/UseFetchPost";
import { ToastContainer } from "react-toastify";

const Profile: React.FC = () => {
  const token = GetCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState<boolean>(false);
  const { out, error } = useFetchGet<{
    data: UserProfileDTO;
  }>(`${ApiUrl}/profile`, token, undefined, refresh);
  const { user } = useSelector((state: RootState) => state.user);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      dispatch(userActions.setUser(out.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const handleEditUserFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newEditUserForm = {
      ...editUserForm,
      [name]: value,
    };
    setEditUserForm(newEditUserForm);
  };

  // Edit Profile Api Fetch
  const [submit, setSubmit] = useState<boolean>(false);
  const [editUserForm, setEditUserForm] = useState<EditUserDTO>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { out: editProfileOut, error: editProfileError } = useFetchPost(
    ApiUrl + "/profile/edit",
    editUserForm,
    submit,
    () => setSubmit(false),
    token,
    undefined,
    "patch"
  );

  useEffect(() => {
    if (editProfileError != null) {
      notifyError(
        editProfileError.response?.data?.message || editProfileError.message
      );
    } else if (
      editProfileOut != null &&
      editProfileOut.message === "Email already registered !"
    ) {
      notifyError(editProfileOut.message);
    } else if (editProfileOut != null) {
      notifySuccess(editProfileOut.message);
      setRefresh(!refresh);
      setEditMode(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProfileOut, editProfileError]);

  const handleReferralClick = () => {
    navigate("/profile/referral");
  };
  const handleVoucherClick = () => {
    navigate("/profile/voucher");
  };
  const handleGiftClick = () => {
    navigate("/profile/gift");
  };
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleCancelClick = () => {
    setEditMode(false);
  };
  const handleSaveSclick = () => {
    setSubmit(true);
  };

  return (
    <div className="profile">
      <div className="profile__title">
        <h1>My Profile</h1>
      </div>
      <div className="profile__content">
        <div className="profile__content__container">
          <h3>Name</h3>
          <div id={editMode ? "edit-mode" : ""}>
            {editMode ? (
              <Form
                placeholder={user.name}
                inputType="text"
                name="name"
                validate={false}
                className="edit-form"
                value={user.name}
                onChangeProp={handleEditUserFormChange}
              />
            ) : (
              <h3>{user.name}</h3>
            )}
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Email</h3>
          <div id={editMode ? "edit-mode" : ""}>
            {editMode ? (
              <Form
                placeholder={user.email}
                inputType="email"
                name="email"
                validate={true}
                className="edit-form"
                value={user.email}
                onChangeProp={handleEditUserFormChange}
              />
            ) : (
              <h3>{user.email}</h3>
            )}
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Phone</h3>
          <div id={editMode ? "edit-mode" : ""}>
            {editMode ? (
              <Form
                placeholder={user.phone}
                inputType="tel"
                name="phone"
                validate={true}
                className="edit-form"
                value={user.phone}
                onChangeProp={handleEditUserFormChange}
              />
            ) : (
              <h3>{user.phone}</h3>
            )}
          </div>
        </div>
        <div className="profile__content__container">
          <h3>Address</h3>
          <div id={editMode ? "edit-mode" : ""}>
            {editMode ? (
              <Form
                placeholder={user.address}
                inputType="text"
                name="address"
                validate={false}
                className="edit-form"
                value={user.address}
                onChangeProp={handleEditUserFormChange}
              />
            ) : (
              <h3>{user.address}</h3>
            )}
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
      <div className="profile__edit-button">
        {editMode && (
          <Button
            label="Save"
            className="profile-button"
            onClickHandler={handleSaveSclick}
          />
        )}
        {editMode ? (
          <Button
            label="Cancel"
            className="profile-button"
            onClickHandler={handleCancelClick}
          />
        ) : (
          <Button
            label="Edit Profile"
            className="profile-button"
            onClickHandler={handleEditClick}
          />
        )}
      </div>
      <div className="profile__buttons">
        <Button
          label="Referral"
          className="profile-nav-button"
          onClickHandler={handleReferralClick}
        />
        <Button
          label="Voucher"
          className="profile-nav-button"
          onClickHandler={handleVoucherClick}
        />
        <Button
          label="Gift"
          className="profile-nav-button"
          onClickHandler={handleGiftClick}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
