import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Button from "../../atoms/Button/Button";
import TitleBox from "../../atoms/TitleBox/TitleBox";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/AuthSlice";
import { RootState } from "../../../store/Index";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = (link: string) => {
    navigate(`/${link}`);
  };

  const logOutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <nav className="navbar__container__nav">
          <Link to={"/"} className="title-link">
            <TitleBox label="eWarta" className="title"></TitleBox>
          </Link>
          <ul className="navbar__list">
            {isAuthenticated && (
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
          </ul>
          <div className="navbar__button">
            {isAuthenticated ? (
              <>
                <Button
                  label="Logout"
                  className="auth"
                  onClickHandler={logOutHandler}
                ></Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
