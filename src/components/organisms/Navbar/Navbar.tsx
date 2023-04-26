import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Button from "../../atoms/Button/Button";
import TitleBox from "../../atoms/TitleBox/TitleBox";

const Navbar: React.FC = () => {
  const [authenticated] = useState(true);
  const navigate = useNavigate();
  const onClickHandler = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <nav className="navbar__container__nav">
          <TitleBox label="eWarta" className="title"></TitleBox>
          <ul className="navbar__list">
            {authenticated && (
              <>
                <li className="navbar__list__item">
                  <NavLink to="/profile" className={"nav-link"}>
                    Profile
                  </NavLink>
                </li>
                <li className="navbar__list__item">
                  <NavLink to="/history" className={"nav-link"}>
                    History
                  </NavLink>
                </li>
                <li className="navbar__list__item">
                  <NavLink to="/subscription" className={"nav-link"}>
                    Subscription
                  </NavLink>
                </li>
              </>
            )}
            <li
              className={
                authenticated
                  ? "navbar__list__item"
                  : "navbar__list__item-single"
              }
            >
              <NavLink to="/" className={"nav-link"}>
                Home
              </NavLink>
            </li>
          </ul>
          <div className="navbar__button">
            <Button
              label="Login"
              className="auth"
              onClickHandler={() => onClickHandler("login")}
            ></Button>
            <Button
              label="Register"
              className="auth"
              onClickHandler={() => onClickHandler("register")}
            ></Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
