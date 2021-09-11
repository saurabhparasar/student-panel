import { Component } from 'react';
import { Link } from 'react-router-dom';
import Studentnav from '../studentnav';
import axios from 'axios';
import Config from '../../config.json';
import Styles from '../studentdashboard.module.css';
import dateFormat from 'dateformat';
import image from './user 1.png'
import './profile.css'
class Profile extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      token: data.token,
      student: data.username,
      student_details: '',
      school_details: '',
      section_details: '',
      classname: '',
      email: '',
      subjects: []
    }

  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append('page_name', 'Student-Profile');
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
    var requestOptions1 = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + this.state.student, requestOptions1)
      .then(response => {
        console.log(response.data);
        var ch = response.data;
        this.setState({
          classname: ch.class_assoc,
          student_details: ch.student_data,
          subjects: ch.student_subjects,
          email: ch.student_data.email,
          school_details: ch.student_data.school_assoc,
          section_details: ch.student_data.section_assoc,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }
  emailchange = (event) => {
    var variable = event.target.value;
    console.log(variable);
    this.setState({
      email: variable,
    })
  }
  submit_email = (e) => {
    e.preventDefault();
    console.log(this.state);
    var formdata = new FormData();
    formdata.append("email", this.state.email);
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: formdata,
      headers: {
        'Authorization': 'Token ' + this.state.token
      },
    };
    fetch(Config.SERVER_URL + "users/update-student-email/", requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        alert(json.Success);
        window.location.reload();
      })
      .catch(error => {
        this.props.history.push('/error');
      });
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
                <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', display: 'inline-block' }}>Student Profile</p>
              </div>
              <center>
                <div>
                  <div class="profile_box">
                    <div class="profile_inner_box">
                      <img src={image} style={{ width: '70px', height: '70px' }} />
                    </div>
                    <div style={{ marginTop: '70px', }}>
                      <div className='profile_data'>Student Name : {this.state.student_details.name}</div>
                      <div className='profile_data'>Student Email : {this.state.student_details.email}</div>
                      <div className='profile_data'>Mobile Number : {this.state.student_details.mobile_number}</div>
                      <div className='profile_data'>Class Name : {this.state.classname}</div>
                      {this.state.subjects.map((item, index) => (
                        <div className='profile_data'>Subject {index + 1}: {item.subject_assoc.subject_name}</div>
                      ))}
                      <div className='profile_data'>Section Name : {this.state.section_details.section_name}</div>
                      <div className='profile_data'>School Name : {this.state.school_details.name}</div>
                      <div className='profile_data'>Student Validity : ---------</div>
                    </div>
                  </div>
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
export default Profile;
