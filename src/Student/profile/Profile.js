import React from "react";
import axios from "axios";
import Config from "../../config.json";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./profile.css";

class Profile extends React.Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      token: data.token,
      student: data.username,
      student_details: "",
      school_details: "",
      section_details: "",
      classname: "",
      email: "",
      subjects: [],
    };
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "Student-Profile");
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
    var requestOptions1 = {
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
    };
    axios
      .get(
        Config.SERVER_URL +
        "users/get-student-details/?username=" +
        this.state.student,
        requestOptions1
      )
      .then((response) => {
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
      .catch((error) => {
        this.props.history.push("/error");
      });
  };
  emailchange = (event) => {
    var variable = event.target.value;
    console.log(variable);
    this.setState({
      email: variable,
    });
  };
  submit_email = (e) => {
    e.preventDefault();
    console.log(this.state);
    var formdata = new FormData();
    formdata.append("email", this.state.email);
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
      body: formdata,
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "users/update-student-email/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert(json.Success);
        window.location.reload();
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  };
  render() {
    return (
      <>
        <Studentnav />

        <div className="profile-container">
          <h2>Student Profile</h2>

          <fieldset className="profile-box-contain">
            <legend>
              <div className="profile-icon">
                <i className="fas fa-user"></i>
              </div>
            </legend>
            <div className="profile-box-content">
              <div>
                <p className="prof-lt">Student Name:</p>
                <p className="prof-rt">{this.state.student_details.name}</p>
              </div>

              <div>
                <p className="prof-lt">Email Id:</p>
                <p className="prof-rt">{this.state.student_details.email}</p>
              </div>

              <div>
                <p className="prof-lt">Mobile Number:</p>
                <p className="prof-rt">
                  {this.state.student_details.mobile_number}
                </p>
              </div>

              <div>
                <p className="prof-lt">Class Name:</p>
                <p className="prof-rt">{this.state.classname}</p>
              </div>

              {this.state.subjects.map((item, index) => (
                <div>
                  <p className="prof-lt">Subject {index + 1}:</p>
                  <p className="prof-rt">{item.subject_assoc.subject_name}</p>
                </div>
              ))}

              <div>
                <p className="prof-lt">Section Name:</p>
                <p className="prof-rt">
                  {this.state.section_details.section_name}
                </p>
              </div>

              <div>
                <p className="prof-lt">School Name:</p>
                <p className="prof-rt">{this.state.school_details.name}</p>
              </div>

              <div>
                <p className="prof-lt">Student Validity:</p>
                <p className="prof-rt">---------</p>
              </div>
            </div>
          </fieldset>
        </div>

        <Footer />
      </>
    );
  }
}
export default Profile;
