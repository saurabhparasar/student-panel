import React from "react";
import footerLogo from "./icons/footerLogo.svg"
import weirdBox from "./icons/weirdBox.svg"
import facebook from "./icons/facebook.svg";
import linkedIn from "./icons/linkedIn.svg";
import instagram from "./icons/instagram.svg";
import twitter from "./icons/twitter.svg";
import whatsapp from "./icons/whatsapp.svg";
import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <img src={footerLogo} alt="zinedu logo" />
      </div>

      <div className="footer-section-01">
        <div className="col01">
          <img src={weirdBox} alt="" />
          <ul className="address">
            <li>
              <p>
                Zinedu Classes Pvt Ltd. 8th Floor, Riana Towers, Plot No. A- 93-94 Sector-136, Noida- 201305 (UP)
              </p>
            </li>

            <li>
              <p>+91-9821400500</p>
            </li>

            <li>
              <a href="mailto:support@zineduclasses.com">support@zineduclasses.com</a>
            </li>
          </ul>
        </div>

        <div className="col02">
          <h2>Information</h2>
          <ul>
            <li>
              <a href="#">Refund Policy</a>
            </li>
            <li>
              <a href="https://zinedu.com/privacy-policy/">Privacy Policy</a>
            </li>
            <li>
              <a href="https://zinedu.com/terms-and-conditions/">Terms and Conditions</a>
            </li>
          </ul>
        </div>

        <div className="col03">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="https://zinedu.com/sample-test-papers/" target="_blank" rel="noreferrer">Sample Test Papers</a>
            </li>
            <li>
              <a href="https://zinedu.com/contact-us/" target="_blank" rel="noreferrer">Contact Us</a>
            </li>
            <li>
              <a href="https://zinedu.com/video-lectures/" target="_blank" rel="noreferrer">Sample Video Lectures</a>
            </li>
            <li>
              <a href="https://zinedu.com/media/" target="_blank" rel="noreferrer">Media</a>
            </li>
            <li>
              <a href="https://zinedu.com/sitemap/" target="_blank" rel="noreferrer">Sitemap</a>
            </li>
          </ul>
        </div>

        <div className="col04">
          <div className="row01">
            <h2>Follow us</h2>
            <ul className="follow-links">
              <li>
                <a
                  href="https://www.facebook.com/zineduclasses"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="fb icon" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/company/zinedu"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={linkedIn} alt="linkedin icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/zineduclasses/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagram} alt="instagram icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ZineduClasses"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={twitter} alt="twitter icon" />
                </a>
              </li>
            </ul>
          </div>

          <div className="row02">
            <h2>Chat with Us</h2>
            <ul>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=919821400500"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={whatsapp} alt="whatsapp icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-section-02">
        <p>Copyright &copy; 2021 ZinEdu</p>
      </div>
    </footer>
  );
};
export default Footer
