import { Component } from "react";
import ReactLoading from "react-loading";
import Config from "../config.json";
import "./landing.css";
import Logo from "./img/zineduLogo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      token: "",
      permission: "",
      iserror: false,
      authenticated: false,
      isloading: false,
    };
  }
  ch = () => {
    if (this.state.authenticated === true) {
      let data = localStorage.getItem("userdetail");
      data = JSON.parse(data);
      if (data.permission === "Student") {
        this.props.history.push("/student");
      }
    } else {
      localStorage.clear();
      this.setState({
        iserror: true,
        isloading: false,
      });
    }
  };
  onSubmithandler = (e) => {
    e.preventDefault();
    this.setState({
      isloading: true,
      iserror: false,
    });
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    console.log(data);
    var formdata = { username: "", password: "" };
    formdata.username = this.state.username;
    formdata.password = this.state.password;
    var input = JSON.stringify(formdata);
    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: input,
    };

    fetch(Config.SERVER_URL + "login/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.token != "undefined") {
          this.setState({ token: json.token });

          var getreq = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Token " + this.state.token,
            },
          };
          fetch(
            Config.SERVER_URL +
            "users/get-user-type/?username=" +
            this.state.username,
            getreq
          )
            .then((response) => response.json())
            .then((json) => {
              this.setState({
                permission: json.user_type.user_type,
                authenticated: true,
              });
              let store = {};
              if (json.user_type.user_type === "Student") {
                store["username"] = this.state.username;
                store["token"] = this.state.token;
                store["permission"] = json.user_type.user_type;
                store["authenticated"] = true;
                localStorage.setItem("userdetail", JSON.stringify(store));
                this.ch();
              } else {
                alert("Access Denied");
                this.setState({
                  isloading: false,
                });
                localStorage.clear();
              }
            });
        } else {
          this.setState({ authenticated: false });
          this.ch();
        }
      });
  };

  onusernamechange = (e) => {
    let variable = e.target.value;
    this.setState({
      username: variable,
    });
  };
  onpasswordchange = (e) => {
    let variable = e.target.value;
    this.setState({
      password: variable,
    });
  };

  Rorgothandler = () => {
    this.props.history.push("/");
  };
  forgothandler = () => {
    this.props.history.push("/forgotPassword");
  };
  render() {
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    if (data != null) {
      this.props.history.push("/" + data.permission);
      return null;
    }
    var error;
    if (this.state.iserror) {
      error = <p>Wrong Credentials</p>;
    }
    var load;
    if (this.state.isloading) {
      load = (
        <p>
          <ReactLoading type="spinningBubbles" color="blue" height="3px" />
        </p>
      );
    }
    return (
      <div className="login-container">
        <header className="login-navbar">
          <div className="logo">
            <a href="https://zinedu.com/">
              <img src={Logo} alt="logo" />
            </a>
          </div>
        </header>

        <main className="login-main-container">
          <div> {/* just for top margin */}</div>
          <form onSubmit={this.onSubmithandler}>
            <div className="zinLogo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="greet01">
              <p>Welcome back!</p>
            </div>
            <div className="username-input">
              <input
                type="text"
                placeholder="Username"
                name="useraname"
                onChange={this.onusernamechange}
                required
              />
            </div>
            <div className="password-input">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onpasswordchange}
                required
              />
            </div>
            <div className="forgotPass">
              <p onClick={this.forgothandler}>Forgot Password?</p>
            </div>
            <div className="wrongPass">{error}</div>
            <div className="login-btn-01">
              <button type="submit">Login</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}
export default Login;
