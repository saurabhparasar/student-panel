import { Component } from 'react';
import axios from 'axios';
import Config from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../landing/landing.css";
import Logo from "../landing/img/zineduLogo.png"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isloading: false,
            Mobile_Number: '',
        }
    }
    onMobileNumber = (e) => {
        const data = e.target.value
        console.log(data)
        this.setState({
            Mobile_Number: data
        })
    }
    onSubmithandler = (e) => {
        e.preventDefault();
        if (isNaN(this.state.Mobile_Number) === true) {
            console.log('hello')
            toast.error('Input Value Must be a Number', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        else {
            let formdata = new FormData()
            formdata.append('username', this.state.Mobile_Number)
            axios.post(Config.SERVER_URL + `forgot-password-request/`, formdata).then((data) => {
                console.log(data)
                if (data.data.Success) {
                    toast.success('Otp sent Successfully', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setTimeout(() => {
                        this.props.history.push({
                            pathname: '/ChoosePassword',
                            state: { mobile_number: this.state.Mobile_Number }
                        })
                    }, 1500);
                }
                else {
                    toast.error('User Does Not Exist', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            }).catch((err) => {
                toast.error('Server Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            })
        }
    }
    render() {
        return (
            <div className="login-container">
                <ToastContainer />
                <form onSubmit={this.onSubmithandler}>
                    <div className="zinLogo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="greet02">
                        <p className="greet-p-01">Forgot Password?</p>
                        <p className="greet-p-02">Verify Mobile Number</p>
                    </div>

                    <div className="mobile-input">
                        <input type="tel" placeholder="Mobile Number" onChange={this.onMobileNumber} required pattern="(0|91)?[7-9][0-9]{9}" />
                    </div>
                    <div className="login-btn-02">
                        <button type="submit">Verify And Send OTP</button>
                    </div>
                </form>
            </div>

        );
    }
}
export default Login;
