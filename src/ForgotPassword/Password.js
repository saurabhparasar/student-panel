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
            otp: '',
            Password1: '',
            Password2: ''
        }
    }
    otpchange = (e) => {
        const data = e.target.value
        console.log(data)
        this.setState({
            otp: data
        })
    }
    password_one = (e) => {
        const data = e.target.value
        this.setState({
            Password1: data
        })
    }
    password_two = (e) => {
        const data = e.target.value
        console.log(data)
        this.setState({
            Password2: data
        })
    }
    onSubmithandler = (e) => {
        console.log(this.props.location.state.mobile_number)
        e.preventDefault();
        let formdata = new FormData()
        formdata.append('password1', this.state.Password1)
        formdata.append('password2', this.state.Password2)
        for (var value of formdata.values()) {
            console.log(value);
        }
        axios.post(Config.SERVER_URL + `forgot-password/${this.state.otp}/${this.props.location.state.mobile_number}/`, formdata).then((data) => {
            console.log(data)
            if (data.data.Success) {
                toast.success('Password Changed Successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500);
            }
            else {
                toast.error(data.data.Error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="login-container">
                <ToastContainer />
                <form onSubmit={this.onSubmithandler}>
                    <div className="zinLogo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="greet03">
                        <p>Forgot Password</p>
                    </div>

                    <div className="otp-input">
                        <input type="text" placeholder="Enter OTP" onChange={this.otpchange} required />
                    </div>

                    <div className="pass-input-01">
                        <input type="password" placeholder="Enter Password" onChange={this.password_one} required />
                    </div>

                    <div className="pass-input-02">
                        <input type="password" placeholder="Confirm Password" onChange={this.password_two} required />
                    </div>

                    <div className="login-btn-03">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;
