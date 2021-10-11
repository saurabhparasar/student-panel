import { Component } from "react";
import { Link } from "react-router-dom";
import Studentnav from "./studentnav";
import axios from "axios";
import Config from "../config.json";
import Styles from "./studentdashboard.module.css";
import dateFormat from "dateformat";
import Issue from "./Issue";
import "./CustomStudentStyles.css";
import quizImage from "./no quiz scheduled png 1.png";
import classImage from "./no class scheduled png 2.png";
import noTest from "./no test scheduled png 3.png";
import nextBtn from "./next button.svg";
import prevBtn from "./previous button.svg";
import notesIcon from "./notesIcon.png";
import Footer from "./Footer";

class Student extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      sectionid: "",
      token: data.token,
      student: data.username,
      class_subject: [],
      class_name: [],
      faculty_name: [],
      class_date: [],
      class_day: [],
      class_time: [],
      class_month: [],
      class_year: [],
      student_subject: [],
      meeting_number: [],
      attendance: "",
      student_subjects: [],
      student_subjects_name: [],
      subject_attendance: [],
      student_details: "",
      upcoming_tests: [],
      upcoming_quiz: [],
      classid: "",
      school_id: "",
    };
  }
  Logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  componentDidMount = () => {
    var formdata = new FormData();
    formdata.append("page_name", "student-dashboard");
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
        // console.log(json);
        // this.props.history.push('/error');
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
        });
      });
    var requestOptions1 = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    axios
      .get(
        Config.SERVER_URL + "student/get-student-attendance/",
        requestOptions1
      )
      .then((response) => {
        // console.log(response.data)
        var ch = response.data;
        this.setState({
          attendance: ch,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        Config.SERVER_URL +
        "student/get-scheduled-objective-exams/?student=" +
        this.state.student +
        "&type=1",
        requestOptions1
      )
      .then((response) => {
        let lang = response.data;
        // console.log(lang);
        this.setState({
          upcoming_tests: lang,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    axios
      .get(
        Config.SERVER_URL +
        "student/get-scheduled-objective-exams/?student=" +
        this.state.student +
        "&type=3",
        requestOptions1
      )
      .then((response) => {
        let lang = response.data;
        // console.log(lang);
        this.setState({
          upcoming_quiz: lang,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    let student_subjects = [];
    var subject_attendance = [];
    let subject_name = [];
    axios
      .get(
        Config.SERVER_URL +
        "users/get-student-details/?username=" +
        this.state.student,
        requestOptions1
      )
      .then((response) => {
        // console.log(response.data.student_data)
        // console.log(response.data.student_data.section_assoc.id);
        student_subjects = response.data.student_subjects;
        this.setState({
          student_details: response.data.student_data,
          sectionid: response.data.student_data.section_assoc.id,
          classid: response.data.student_data.section_assoc.class_assoc,
          school_id: response.data.student_data.school_assoc.id,
        });
        student_subjects.map((item) => {
          if (item.subject_assoc.is_main_subject == true) {
            subject_name.push(item.subject_assoc.subject_name);
            axios
              .get(
                Config.SERVER_URL +
                "student/get-student-attendance/?subject=" +
                item.subject_assoc.id,
                requestOptions1
              )
              .then((response) => {
                // console.log(response.data)
                subject_attendance.push(response.data);
                this.setState({
                  subject_attendance: subject_attendance,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
        this.setState({
          student_subjects_name: subject_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(Config.SERVER_URL + "student/student-dashboard/", requestOptions1)
      .then((response) => {
        // console.log(response.data);
        // const user = response.data.username;
        // const stusub = response.data.section_subjects;
        const sub = [];
        const cls = [];
        const fac = [];
        const fulltime = [];
        const month = [];
        const date = [];
        const year = [];
        const day = [];
        const time = [];
        const meeting = [];
        const meeting_number = [];
        for (let i = 0; i < response.data.live_classes.length; i++) {
          sub.push(response.data.live_classes[i][1]);
          cls.push(response.data.live_classes[i][0]);
          fac.push(response.data.live_classes[i][2]);
          meeting.push(response.data.live_classes[i][3]);
          fulltime.push(response.data.live_classes[i][4]);
        }
        // console.log(stusub);
        // console.log(sub);
        // console.log(cls);
        // console.log(fac);
        // console.log(fulltime);
        // console.log(meeting);
        for (let i = 0; i < response.data.live_classes.length; i++) {
          var a = meeting[i].split("/");
          var b = a[a.length - 1];
          meeting_number.push(b.split("?", 1));
        }
        // console.log(meeting_number);
        for (let i = 0; i < response.data.live_classes.length; i++) {
          month.push(dateFormat(fulltime[i], "mmm"));
          date.push(dateFormat(fulltime[i], "dS"));
          year.push(dateFormat(fulltime[i], "yyyy"));
          day.push(dateFormat(fulltime[i], "DDDD"));
          time.push(dateFormat(fulltime[i], "hh:MM TT"));
        }
        this.setState({
          // name:user,
          class_subject: sub,
          class_name: cls,
          faculty_name: fac,
          class_date: date,
          class_month: month,
          class_day: day,
          class_year: year,
          class_time: time,
          // student_subject:stusub,
          meeting_number: meeting_number,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selected_subject = (item) => {
    // console.log(item);
    this.props.history.push({
      pathname: "/student/assignment",
      state: { selected_subject_id: item },
    });
  };

  onJoinmeeting = (item) => {
    this.props.history.push("/student/liveclass/upcomingliveclass");
  };
  onPastliveclass = () => {
    this.props.history.push("/student/liveclass/pastliveclass");
  };
  ViewAll = () => {
    this.props.history.push({
      pathname: "/student/objectivetest",
      state: { exam_type: 1 },
    });
  };
  startTest = (item) => {
    this.props.history.push({
      pathname: "/student/objectiveexaminstruction",
      state: { examdetails: item.exam_details },
    });
  };
  jeeadvance = () => {
    window.open(
      `https://class.zinedu.com/WEBStudent/JEEAdvancePageAccess?StudentReferenceId=${this.state.student_details.id}&ClassId=${this.state.classid}&SectionId=${this.state.sectionid}&SchoolId=${this.state.school_id}`
    );
  };
  jeeadvance2 = () => {
    window.open(
      `https://class.zinedu.com/WEBStudent/JEEAdvancePageAccess?StudentReferenceId=${this.state.student_details.id}&ClassId=${this.state.classid}&SectionId=${this.state.sectionid}&SchoolId=${this.state.school_id}`
    );
  };
  render() {
    if (this.state.class_subject.length > 0) {
      var items = [
        <div className="item active">
          <div className="row">
            <div className="student-box-01-content">
              <div className="col-xs-8 std-mobile-01">
                <h2>Upcoming Classes</h2>

                <p>
                  Subject: <span>{this.state.class_subject[0]}</span>
                </p>

                <p>
                  Details of Class: <span>{this.state.class_name[0]}</span>
                </p>

                <p>
                  Faculty Name: <span>{this.state.faculty_name[0]}</span>
                </p>

                <button
                  onClick={() => {
                    this.onJoinmeeting(this.state.meeting_number[0]);
                  }}
                  className="std-btn-content-01"
                >
                  JOIN NOW
                </button>

                <button
                  onClick={this.onPastliveclass}
                  className="std-btn-content-02"
                >
                  PAST CLASSES
                </button>
              </div>

              <div className="col-xs-4 std-contain-001">
                <div className="student-calender">
                  <div id="month">
                    <p>
                      {this.state.class_month[0]} {this.state.class_year[0]}
                    </p>
                  </div>
                  <div id="day">
                    <p
                      style={{
                        fontSize: "clamp(15px, 1.5vw, 24px)",
                        textTransform: "lowercase",
                      }}
                    >
                      {this.state.class_date[0]}
                    </p>
                    <p style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>
                      {this.state.class_time[0]}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 1.5vw, 20px)" }}>
                      {this.state.class_day[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      ];
      // items = (<div className="item active">{this.state.subject[0]}</div>)
      for (
        let itemCounter = 1;
        itemCounter < this.state.class_subject.length;
        itemCounter++
      ) {
        items.push(
          <div className="item">
            <div className="row">
              <div className="student-box-01-content">
                <div className="col-xs-8 std-mobile-01">
                  <h2>Upcoming Classes</h2>

                  <p>
                    Subject:{" "}
                    <span>{this.state.class_subject[itemCounter]}</span>
                  </p>

                  <p>
                    Details of Class:{" "}
                    <span>{this.state.class_name[itemCounter]}</span>
                  </p>

                  <p>
                    Faculty Name:{" "}
                    <span>{this.state.faculty_name[itemCounter]}</span>
                  </p>

                  <button
                    onClick={() => {
                      this.onJoinmeeting(this.state.meeting_number[0]);
                    }}
                    className="std-btn-content-01"
                  >
                    JOIN NOW
                  </button>

                  <button
                    onClick={this.onPastliveclass}
                    className="std-btn-content-02"
                  >
                    PAST CLASSES
                  </button>
                </div>

                <div className="col-xs-4 std-contain-001">
                  <div className="student-calender">
                    <div id="month">
                      <p>
                        {this.state.class_month[itemCounter]}{" "}
                        {this.state.class_year[itemCounter]}
                      </p>
                    </div>
                    <div id="day">
                      <p
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 25px)",
                          textTransform: "lowercase",
                        }}
                      >
                        {this.state.class_date[itemCounter]}
                      </p>
                      <p style={{ fontSize: "clamp(10px, 1.5vw, 17px)" }}>
                        {this.state.class_time[itemCounter]}
                      </p>
                      <p style={{ fontSize: "clamp(12px, 1.5vw, 20px)" }}>
                        {this.state.class_day[itemCounter]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (this.state.class_subject.length === 0) {
      var items = [
        <div className="item active">
          <div className="row">
            <div className="student-box-01-content">
              <div className="col-xs-8 std-mobile-01">
                <h2>Upcoming Classes</h2>
                <span className="resize-img-03">
                  <img src={classImage} alt="" />
                </span>

                <button
                  onClick={this.onPastliveclass}
                  className="std-btn-content-02 margin-fix"
                >
                  PAST CLASSES
                </button>
              </div>
            </div>
          </div>
        </div>,
      ];
    }
    // upcoming class box code ends

    // assignment box code starts
    var assignment = [];

    if (this.state.student_subjects_name.length > 0) {
      assignment = this.state.student_subjects_name.map((item) => {
        return (
          <div class="col-xs-4">
            <Link
              to={{
                pathname: "/student/assignmentssubjects",
                state: { exam_type: 2 },
              }}
            >
              <div className="assignment-flex-box-content">{item}</div>
            </Link>
          </div>
        );
      });
    }

    // assignment box code ends

    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                This feature is not available currently
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <Issue />

        <Studentnav history={this.props.history} />
        <div className={Styles.studentdashboard}>
          <section className="greeting-msg">
            <h2>Hi {this.state.student_details.name}!</h2>
          </section>

          <div className="container-fluid" id="std-container">
            {/* <div className="row" style={{ marginTop: '40px' }}>
              <div className="col-sm-8">
                <form>
                  <div style={searchContainer}>
                    <i className="fa fa-search" style={searchIcon}></i>
                    <input style={searchBox} className="form-control" type="text" name="search" placeholder="Search video, test series and notes" />
                    <input type="submit" value="Search" style={searchButton} />
                  </div>
                </form>
              </div>
              <div className="col-sm-4">
                <Link to='/student/feemodule/installmentpage'>
                  <button style={btn2}>PAY FEES</button>
                </Link>
              </div>
            </div> */}

            <div className="row" style={{ marginTop: "50px" }}>
              <div className="col-md-8">
                <div className="student-super-box">
                  <div
                    id="myCarousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">{items}</div>
                    <a
                      id={Styles.leftarrow}
                      className="left carousel-control flex-btn"
                      href="#myCarousel"
                      data-slide="prev"
                    >
                      {/* Upcoming class left button svg */}
                      <img src={prevBtn} className="lt-btn" alt="" />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      id={Styles.rightarrow}
                      className="right carousel-control flex-btn"
                      href="#myCarousel"
                      data-slide="next"
                    >
                      {/* Upcoming class right button svg */}
                      <img src={nextBtn} className="rt-btn" alt="" />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>

                {/* Assignment box starts*/}

                <div className="student-super-box">
                  <div className="row">
                    <div className="col-xs-12 student-box-02-content">
                      <div className="flex-it">
                        <h2>Assignments</h2>
                        <Link
                          to={{
                            pathname: "/student/assignmentssubjects",
                            state: { exam_type: 2 },
                          }}
                        >
                          <button className="std-btn-content-03">
                            View All
                          </button>
                        </Link>
                      </div>

                      <div className="assignment-flex-box-container">
                        {assignment}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Assignment box ends*/}

                {/* test box starts */}
                {this.state.upcoming_tests.length === 0 ? (
                  <div className="student-super-box">
                    <div className="row">
                      <div className="col-xs-12 student-box-02-content">
                        {this.state.sectionid === 303 ? (
                          <div className="flex-it">
                            <h2>Test</h2>
                            <button
                              className="std-btn-content-03"
                              onClick={this.jeeadvance}
                            >
                              jee advanced test series
                            </button>
                          </div>
                        ) : (
                          <div className="col-xs-12 student-box-02-content">
                            <div className="flex-it">
                              <h2>Test</h2>
                              <button
                                className="std-btn-content-03"
                                onClick={this.ViewAll}
                              >
                                View All
                              </button>
                            </div>

                            <span className="resize-img">
                              <img
                                src={noTest}
                                alt=""
                                style={{ marginTop: "0px" }}
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* not edited this part */
                  <div className="student-super-box">
                    <div className="row">
                      <div className="col-xs-12 student-box-02-content">
                        <div className="flex-it">
                          <h2>Test</h2>
                          <button
                            className="std-btn-content-03"
                            onClick={this.ViewAll}
                          >
                            View All
                          </button>
                        </div>

                        <div className="flex-it">
                          <div>
                            {this.state.upcoming_tests.map((item, index) => {
                              if (index == 0) {
                                let data = item;
                                return (
                                  <div className="top-mid-msg-04">
                                    <h3>{item.exam_assoc.exam_topic}</h3>
                                    <div className="test-details">
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <i
                                          className="far fa-calendar-alt test-minis"
                                          style={{ marginLeft: "14px" }}
                                        ></i>
                                        <p>
                                          Date:
                                          <span>
                                            {dateFormat(
                                              item.exam_assoc.exam_start_date,
                                              "ddd dd/mm/yyyy"
                                            )}
                                          </span>
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <i className="far fa-clock test-minis"></i>
                                        <p>
                                          Time:
                                          <span>
                                            {dateFormat(
                                              item.exam_assoc.exam_start_date,
                                              "h:MM TT"
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>

                          <div className="testSvg">
                            <svg
                              width="180"
                              height="180"
                              viewBox="0 0 196 196"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M97.5586 0C43.7411 0 0 43.74 0 97.558C0 151.376 43.741 195.117 97.5586 195.117C151.376 195.117 195.117 151.376 195.117 97.558C195.117 43.7401 151.376 0 97.5586 0ZM97.5586 10.5469C145.676 10.5469 184.57 49.44 184.57 97.558C184.57 145.676 145.676 184.57 97.5586 184.57C49.4409 184.57 10.5469 145.676 10.5469 97.558C10.5469 49.44 49.4408 10.5469 97.5586 10.5469ZM96.6843 51.252C78.5934 51.3798 61.3417 63.2633 54.6743 80.075C47.7355 96.5072 51.5714 116.733 64.0487 129.481C76.1805 142.541 96.1698 147.354 112.913 141.233C130.459 135.256 143.349 117.9 143.813 99.3421C144.748 81.3127 133.912 63.4859 117.598 55.8293C111.372 52.815 104.462 51.2458 97.5465 51.255C97.2591 51.251 96.9717 51.25 96.6844 51.252H96.6843ZM98.3341 59.6867C114.862 59.7605 130.367 71.9759 134.221 88.0763C138.513 103.793 131.281 121.714 117.202 129.949C102.827 138.971 82.5588 136.567 70.7542 124.348C58.297 112.33 56.0786 91.5379 65.6358 77.1257C72.4046 66.3735 84.8364 59.5686 97.5465 59.6925C97.8093 59.6874 98.0718 59.6855 98.3341 59.6867ZM109.509 70.4521L96.8627 93.3944C92.957 93.8097 92.0291 99.7354 95.6327 101.316C98.0132 102.968 99.8775 100.22 102.044 100.314H121.376V95.041H101.977L114.127 72.9976L109.509 70.4521Z"
                                fill="#EB7926"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <div className="grid-layout">
                  <div className="row grid-01">
                    {/* <div className="col-sm-6 grid-01-01">
                      <Link
                        to="/student/doubtmodule/uploaddoubt"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="student-mini-box mini-box-02">
                          <i class="far fa-question-circle mini-icon"></i>
                          <p>ASK A DOUBT</p>
                        </div>
                      </Link>
                    </div> */}
                    <div className="col-sm-6 grid-01-01">
                      <Link
                        to="/student/doubtmodule/SearchQuestion"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="student-mini-box mini-box-02">
                          <i class="far fa-question-circle mini-icon"></i>
                          <p>MODULE SOLUTION</p>
                        </div>
                      </Link>
                    </div>
                    

                    <div className="col-sm-6 grid-01-02">
                      <Link
                        to="/student/notes/notessubjects"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="student-mini-box mini-box-02">
                          <img src={notesIcon} alt="" />
                          <p>Notes</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <br />

                  <div className="row grid-02">
                    <div className="col-sm-6 grid-02-01">
                      <Link to="/student/StudyMaterialSubject">
                        <div className="student-mini-box mini-box-02">
                          <svg
                            style={{ marginTop: "11px" }}
                            width="55"
                            height="55"
                            viewBox="0 0 167 148"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="101.34"
                              y1="145.344"
                              x2="2.13851"
                              y2="112.598"
                              stroke="#E97A26"
                              stroke-width="4"
                              stroke-linecap="round"
                            ></line>
                            <path
                              d="M65.8462 3L4.00023 74.44L30.7142 82.94L102.02 105.632L137.018 65.204L163.732 34.346V34.148L65.8462 3Z"
                              stroke="#E97A26"
                              stroke-width="4.964"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M65.8462 3C    43.7502 32.882 21.5122 48.096 6.87021 28.932C13.0222 69.852 59.1802 94.262 102.02 105.632L137.018 65.204L163.732 34.346V34.148L65.8462 3Z"
                              stroke="#E97A26"
                              stroke-width="4.964"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M99.8662 117.072L28.4835 94.0689L9.86621 88.072"
                              stroke="#E97A26"
                              stroke-width="3"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M99.8662 125.072L27.6904 102.069L8.86621 96.072"
                              fill="#E0E0E0"
                            ></path>
                            <path
                              d="M99.8662 125.072L27.6904 102.069L8.86621 96.072"
                              stroke="#E97A26"
                              stroke-width="3"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M99.8662 133.072L27.6904 109.276L8.86621 103.072"
                              fill="#E0E0E0"
                            ></path>
                            <path
                              d="M99.8662 133.072L27.6904 109.276L8.86621 103.072"
                              stroke="#E97A26"
                              stroke-width="3"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M137.018 65.204L102.02 105.632L101.886 105.588V145.144L163.732 73.704V34.346L137.018 65.204Z"
                              stroke="#E97A26"
                              stroke-width="4.964"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <line
                              x1="3.64394"
                              y1="75.1755"
                              x2="2.08474"
                              y2="111.142"
                              stroke="#E97A26"
                              stroke-width="4"
                              stroke-linecap="round"
                            ></line>
                          </svg>
                          <p>Modules</p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-sm-6 grid-02-02">
                      <div
                        className="student-mini-box mini-box-02"
                        data-toggle="modal"
                        data-target="#exampleModal1"
                      >
                        <i class="far fa-bell  mini-icon"></i>
                        <p>NOTIFICATIONS</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="student-super-box-01 student-super-box">
                      <h2 style={{ textAlign: "center" }}>Attendance</h2>
                      <div className="attendance-record-detail">
                        <div className="attendance-marks">
                          <div className="top-section-mark">
                            {this.state.attendance.attendance_count}
                          </div>
                          <div className="btm-section-mark">
                            {this.state.attendance.total_classes}
                          </div>
                        </div>
                        <div className="attendance-subject">
                          <ul>
                            {this.state.student_subjects_name.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="attendance-score">
                          <ul>
                            {this.state.subject_attendance.map((item) => (
                              <li>
                                {item.attendance_count}/{item.total_classes}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="student-super-box">
                      {this.state.upcoming_quiz.length === 0 ? (
                        <div className="quiz-box-content">
                          <h2>Quiz</h2>
                          <span className="resize-img-01">
                            <img src={quizImage} alt="" />
                          </span>
                          <div
                            className="center-this-btn"
                            style={{ margin: "0px" }}
                          >
                            <Link
                              to={{
                                pathname: "/student/objectivetest",
                                state: { exam_type: 3 },
                              }}
                              style={{ background: "none" }}
                            >
                              <button className="std-btn-content-04">
                                View All
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="quiz-box-content">
                          <h2>Quiz</h2>

                          <div className="quiz-details">
                            {this.state.upcoming_quiz.map((item, index) => {
                              if (index === 0) {
                                return (
                                  <ul>
                                    <li
                                      style={{
                                        fontSize: "clamp(12px, 2vw, 24px)",
                                      }}
                                    >
                                      {item.exam_assoc.exam_topic}
                                    </li>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <i
                                        className="far fa-calendar-alt test-miniss"
                                        style={{ marginLeft: "12px" }}
                                      ></i>
                                      <li>
                                        Date:
                                        <span>
                                          {dateFormat(
                                            item.exam_assoc.exam_start_date,
                                            "d/mm/yyyy"
                                          )}
                                        </span>
                                      </li>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <i className="far fa-clock test-miniss"></i>
                                      <li>
                                        Time:
                                        <span>
                                          {dateFormat(
                                            item.exam_assoc.exam_start_date,
                                            "h:MM TT"
                                          )}
                                        </span>
                                      </li>
                                    </div>
                                  </ul>
                                );
                              }
                            })}

                            <div
                              className="center-this-btn"
                              style={{ margin: "14px 0 3px" }}
                            >
                              <Link
                                to={{
                                  pathname: "/student/objectivetest",
                                  state: { exam_type: 3 },
                                }}
                              >
                                <button className="std-btn-content-04">
                                  View All
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="row" style={{marginTop:'70px'}}>
  <div className="col-md-4">

  </div>
  <div className="col-md-4">

  </div>
  <div className="col-md-4">
  <Link to='/student/videolectures'>
  <div style={box3}>
  <svg style={{width:'54',  height:'54'}} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M52.418 23.9418H38.0742V17.7572L49.6104 12.6875C50.8674 12.1351 50.8699 10.3443 49.6104 9.79078L27.6365 0.13417C27.2309 -0.0440723 26.7691 -0.0440723 26.3636 0.13417L4.38961 9.79078C3.13263 10.3431 3.1301 12.134 4.38961 12.6875L15.9206 17.7548V23.9418H1.58203C0.708328 23.9418 0 24.6502 0 25.5239V52.4184C0 53.2921 0.708328 54.0004 1.58203 54.0004H52.418C53.2917 54.0004 54 53.2921 54 52.4184V25.5239C54 24.6502 53.2917 23.9418 52.418 23.9418ZM8.95831 11.2391L27 3.31057L45.0417 11.2392L38.0742 14.3011V12.7674C38.0742 12.1686 37.7361 11.6211 37.2006 11.3529C37.0576 11.2813 33.6209 9.59809 27.0053 9.59809C20.3683 9.59809 16.9361 11.2817 16.7932 11.3533C16.2582 11.6216 15.9205 12.1689 15.9205 12.7674V14.2987L8.95831 11.2391ZM34.9102 23.8311H19.0846V13.8504C23.4542 12.4066 30.4876 12.3892 34.9102 13.8501C34.9102 16.296 34.9048 20.9409 34.9102 23.8311ZM3.16406 27.1059H9.59766C9.59766 30.5952 6.75886 33.434 3.26953 33.434H3.16406V27.1059ZM3.16406 50.8364V44.5083H3.26953C6.75886 44.5083 9.59766 47.3471 9.59766 50.8364H3.16406ZM50.8359 50.8364H44.4721C44.4721 47.3471 47.3109 44.5083 50.8002 44.5083H50.8359V50.8364ZM50.8359 41.3442H50.8002C45.5662 41.3442 41.308 45.6024 41.308 50.8364H12.7617C12.7617 45.6024 8.50352 41.3442 3.26953 41.3442H3.16406V36.5981H3.26953C8.50352 36.5981 12.7617 32.3399 12.7617 27.1059H41.308C41.308 32.3399 45.5662 36.5981 50.8002 36.5981H50.8359V41.3442ZM50.8359 33.434H50.8002C47.3109 33.434 44.4721 30.5952 44.4721 27.1059H50.8359V33.434Z" fill="white"/>
  </svg>
  <br/>
  <button style={btn1}>Video Lectures</button>
  </div>
  </Link>
  </div>
</div>
*/}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Student;
