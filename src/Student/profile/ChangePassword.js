import { Component } from 'react';
import { Link } from 'react-router-dom';
import Studentnav from '../studentnav';
import axios from 'axios';
import Config from '../../config.json';
import Styles from '../studentdashboard.module.css';
import dateFormat from 'dateformat';
class ChangePassword extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      token: data.token,
      student: data.username,
      oldpass: '',
      newpass: '',
      renewpass: '',
    }

  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append('page_name', 'Change-Password-Student');
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Authorization': 'Token ' + this.state.token
      },
    };
    fetch(Config.SERVER_URL + "users/post-analytics/", requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }
  oldpass = (event) => {
    var variable = event.target.value;
    this.setState({
      oldpass: variable,
    })
  }
  newpass = (event) => {
    var variable = event.target.value;
    this.setState({
      newpass: variable,
    })
  }
  renewpass = (event) => {
    var variable = event.target.value;
    this.setState({
      renewpass: variable,
    })
  }
  submit_password = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("old_password", this.state.oldpass);
    formdata.append("new_password", this.state.newpass);
    formdata.append("confirm_password", this.state.renewpass);

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: formdata,
      headers: {
        'Authorization': 'Token ' + this.state.token
      },
    };
    fetch(Config.SERVER_URL + "users/change-password/", requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.Success) {
          alert(json.Success);
          localStorage.clear();
          this.props.history.push('/');
        }
        else {
          alert(json.Error);
        }
      })
      .catch(error => {
        this.props.history.push('/error');

      });
    document.getElementById("registerform").reset();

  }
  render() {
    var dateFormat = require("dateformat");
    return (
      <div>
        <Studentnav />
        <div className="container">

          <div className="row" style={{ marginTop: '50px' }}>
            <div className="col-md-12">
              <div class="title">
                <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', display: 'inline-block' }}>Change Password</p>
              </div>
              <center>
                <div class="box" style={{ padding: '50px', boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)', borderRadius: '20px', marginTop: '50px', width: '95%', maxWidth: '500px' }}>
                  <form id="registerform" onSubmit={this.submit_password}>
                    <input type="password" style={{ border: 'none', borderBottom: '1px solid #C7C7C7', boxShadow: 'none', borderRadius: 'none' }} onChange={this.oldpass} class="form-control" placeholder="Your Old Password" required />
                    <br />
                    <input type="password" style={{ border: 'none', borderBottom: '1px solid #C7C7C7', boxShadow: 'none', borderRadius: 'none' }} onChange={this.newpass} class="form-control" placeholder="Type New Password" required />
                    <br />

                    <input type="password" style={{ border: 'none', borderBottom: '1px solid #C7C7C7', boxShadow: 'none', borderRadius: 'none' }} onChange={this.renewpass} class="form-control" placeholder="Retype New Password" required />
                    <br />
                    <br />

                    <button type="submit" style={{ background: '#2A3885', borderRadius: '23px', color: 'white', fontFamily: 'Montserrat', width: '100%' }} class="btn">Change Password</button>
                  </form>
                </div>
              </center>

            </div>
          </div>
        </div>
        <br />
      </div>

    );
  }
}
export default ChangePassword;
