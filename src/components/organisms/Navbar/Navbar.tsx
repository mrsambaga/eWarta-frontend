import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Navbar.scss";
import Button from "../../atoms/Button/Button";
import TitleBox from "../../atoms/TitleBox/TitleBox";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/AuthSlice";
import { RootState } from "../../../store/IndexStore";
import { adminAuthActions } from "../../../store/AdminAuthSlice";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isAdminAuthenticated } = useSelector(
    (state: RootState) => state.authAdmin
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onClickHandler = (link: string) => {
    navigate(`/${link}`);
  };

  const logOutHandler = () => {
    if (isAuthenticated) {
      dispatch(authActions.logout());
      navigate("/login");
    } else if (isAdminAuthenticated) {
      dispatch(adminAuthActions.logout());
      navigate("/admin/login");
    }
  };

  return (
    <div className="navbar-outer">
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
              {isAdminAuthenticated && (
                <>
                  <li className="navbar__list__item">
                    <NavLink to="/admin/posts" className={"nav-link"}>
                      Posts
                    </NavLink>
                  </li>
                  <li className="navbar__list__item">
                    <NavLink to="/admin/transaction" className={"nav-link"}>
                      Transaction Invoice
                    </NavLink>
                  </li>
                  <li className="navbar__list__item">
                    <NavLink to="/admin/voucher" className={"nav-link"}>
                      Voucher
                    </NavLink>
                  </li>
                  <li className="navbar__list__item">
                    <NavLink to="/admin/reward" className={"nav-link"}>
                      User Reward
                    </NavLink>
                  </li>
                  <li className="navbar__list__item">
                    <NavLink to="/admin/gift" className={"nav-link"}>
                      Gift
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="navbar__button">
              {location.pathname.includes("/admin") && !isAdminAuthenticated ? (
                <></>
              ) : isAuthenticated || isAdminAuthenticated ? (
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
      <Outlet />
    </div>
  );
};

export default Navbar;
