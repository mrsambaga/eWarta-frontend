import React from "react";
import "./Footer.scss";
import "../Navbar/Navbar.scss";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container__title">
          <h3>eWarta</h3>
        </div>
        <div className="footer__container__content">
          <p>Terms of use</p>
          <p>Privacy Notice</p>
          <p>Contact</p>
          <p>About us</p>
        </div>
        <div className="footer__container__sub-title">
          <h3>WARTAMEDIA</h3>
          <p>© 2023 Warta Media, LLC. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
