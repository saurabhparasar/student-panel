import React from "react";
import Config from "../../config.json";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./profile.css";

class ChangePassword extends React.Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      token: data.token,
      student: data.username,
      oldpass: "",
      newpass: "",
      renewpass: "",
    };
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "Change-Password-Student");
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "users/post-analytics/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  };
  oldpass = (event) => {
    var variable = event.target.value;
    this.setState({
      oldpass: variable,
    });
  };
  newpass = (event) => {
    var variable = event.target.value;
    this.setState({
      newpass: variable,
    });
  };
  renewpass = (event) => {
    var variable = event.target.value;
    this.setState({
      renewpass: variable,
    });
  };
  submit_password = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("old_password", this.state.oldpass);
    formdata.append("new_password", this.state.newpass);
    formdata.append("confirm_password", this.state.renewpass);

    var requestOptions = {
      method: "POST",
      redirect: "follow",
      body: formdata,
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "users/change-password/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.Success) {
          alert(json.Success);
          localStorage.clear();
          this.props.history.push("/");
        } else {
          alert(json.Error);
        }
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    document.getElementById("registerform").reset();
  };

  render() {
    return (
      <>
        <Studentnav />

        <div className="psdContainer">
          <h2>Change Password</h2>

          <form className="psdContain" onSubmit={this.submit_password}>
            <input
              type="password"
              placeholder="Your Old Password"
              onChange={this.oldpass}
              required
            />
            <input
              type="password"
              placeholder="Type New Password"
              onChange={this.newpass}
              required
            />
            <input
              type="password"
              placeholder="Retype New Password"
              onChange={this.renewpass}
              required
            />
            <button type="submit">Change Password</button>
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

export default ChangePassword;
