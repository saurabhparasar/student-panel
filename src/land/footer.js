import {Component} from 'react';
import Style from './footer.module.css';
class Footer extends Component {
  render(){
  return (
    <div >
        <footer>
        <div className="container">
            <div className="row" id={Style.gap1}>
            <div className="col-md-4">
             <img className="group-1" src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/group-1@2x.svg"/>
             <p id={Style.text1}>We are highly passionate team of IITians and ISBians, who aspire to transform the education landscape of the country using technology and innovation.</p>
            </div>
            <div className="col-md-3">
            <h2>Information</h2>
               <p id={Style.text2}>Home</p>
               <p id={Style.text2}>Who We Are</p>
               <p id={Style.text2}>Our Team</p>
               <p id={Style.text2}>Refund Policy</p>
            </div>
            <div className="col-md-3">
            <h2>Quick Links</h2>
            <p id={Style.text2}>Live classNamees</p>
            <p id={Style.text2}>Privacy Policy</p>
            <p id={Style.text2}>Contact U</p>
            </div>
            <div className="col-md-2">
             <h2>Follow Us</h2>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter-square"></i>
            </div>
            </div>
            <p id={Style.text3}> Copyright &copy;  ZinEdu</p>
                </div>
            </footer>
      
    </div>
  );
}
}
export default Footer;
