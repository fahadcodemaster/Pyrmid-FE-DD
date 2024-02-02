import React from "react";
import { Row, Col } from "react-bootstrap";
import footerlogo from "../../assets/images/footer-logo.png";
import phone from "../../assets/images/phone-icon.png";
import mail from "../../assets/images/mail-icon.png";
import { date } from "yup";
const getCurruntYear = () => {
  return new Date().getFullYear();
}
const bottomDiv = {
  position: "relative",
    bottom: 0,
    marginTop:"9.85%"
}
const footer = () => (
  <footer className="container-fluid " style={bottomDiv}>
    <div className="row">
      <div className="full-div footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img className="footer-logo  header-logo"  src={footerlogo} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul>
                <li><a href="mailto:INFO@PYRAMIDCITY.COM"><img src={mail} />Email: INFO@PYRAMIDCITY.COM</a></li>
                <li><a href="tel:001122334455"><img src={phone} />Phone: 001122334455</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 text-center">
        <p>© {new Date().getFullYear()} PYRAMIDCITY - ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
);


//   const yeaar = getYear() {
//     return Date().getFullYear();
// }



export default footer;


