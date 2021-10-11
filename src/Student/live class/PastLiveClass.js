import { Component } from "react";
import ReactLoading from "react-loading";
import Config from "../../config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./liveClass.css";
import sampleImg from "./img/math-teacher.jpg";

class PastLiveClass extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      book_id: "",
      classes: [],
      user: data.username,
      token: data.token,
      message: "",
      notes: "",
      assignments: "",
      solution_video: "",
      assignment_live_class_id: [],
      notes_live_class_id: [],
      isloading: false,
      section: "",
      school: "",
      student_id: "",
    };
    this.baseState = this.state;
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "Past-Live-Class");
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
        this.state.user,
        requestOptions1
      )
      .then((response) => {
        console.log(response.data);
        const ch = response.data;
        this.setState({
          section: ch.student_data.section_assoc.id,
          school: ch.student_data.school_assoc.id,
          student_id: ch.student_data.id,
          // isloading: false,
        });

        let section = ch.student_data.section_assoc.id;
        let school = ch.student_data.school_assoc.id;

        axios
          .get(
            Config.SERVER_URL +
            "student/get-past-live-classes/?section=" +
            section +
            "&school=" +
            school,
            requestOptions1
          )
          .then((response) => {
            console.log(response.data);
            const ch = response.data;
            this.setState({
              classes: ch,
              isloading: false,
            });
          })
          .catch((error) => {
            this.props.history.push("/error");
          });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });

    axios
      .get(Config.SERVER_URL + "student/get-live-class-notes/", requestOptions1)
      .then((response) => {
        console.log(response.data);
        const ch = response.data;
        var arr = [];
        for (var i = 0; i < ch.length; i++) {
          arr.push(ch[i].live_class_assoc);
        }
        console.log(arr);
        this.setState({
          notes_live_class_id: arr,
          notes: ch,
          isloading: false,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    axios
      .get(
        Config.SERVER_URL + "student/live-class-assignments/",
        requestOptions1
      )
      .then((response) => {
        console.log(response.data);
        const ch = response.data;
        var arr = [];
        for (var i = 0; i < ch.length; i++) {
          arr.push(ch[i].live_class_assoc);
        }
        this.setState({
          assignments: ch,
          assignment_live_class_id: arr,
          isloading: false,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  };
  selectedOption = (item) => {
    this.setState({
      solution_video: item,
    });
    document.querySelector(".video-player").style.visibility = "visible";
  };
  onNotes = (id) => {
    console.log(id);
    this.state.notes.map((item) => {
      if (item.live_class_assoc === id) {
        window.location.href = item.notes_assoc.notes_file;
      }
    });
  };
  onAssignment = (id) => {
    console.log(id);
    this.state.assignments.map((item) => {
      if (item.live_class_assoc === id) {
        this.props.history.push({
          pathname: "/student/objectiveexaminstruction",
          state: { examdetails: item },
        });
      }
    });
  };
  onUpdateClick = (item) => {
    this.props.history.push({
      pathname: "/student/doubtmodule/questionlist",
      state: { chapter_id: item },
    });
  };
  upcomingclass = () => {
    this.props.push("/student/liveclass/upcomingliveclass");
  };
  render() {
    var load;
    if (this.state.isloading) {
      load = (
        <p>
          <ReactLoading type="spinningBubbles" color="blue" height="3px" />
        </p>
      );
    }
    var dateFormat = require("dateformat");

    return (
      <>
        <Issue />
        <Studentnav />
        <div className="live-class-container">
          {load}
          <div className="video-player">
            <div className="video-box">
              <div className="video-title">
                <h3>Video:</h3>
                <div
                  onClick={() => {
                    this.setState({ solution_video: null });
                    document.querySelector(".video-player").style.visibility =
                      "hidden";
                  }}
                  className="close-btn"
                >
                  &times;
                </div>
              </div>

              <div className="video-body">
                <ReactPlayer
                  config={{
                    file: { attributes: { controlsList: "nodownload" } },
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  playing={this.state.playing}
                  controls
                  url={this.state.solution_video}
                  width="100%"
                />
              </div>
            </div>
          </div>

          <div className="live-class-title">
            <h2>Past Live Classes</h2>

            <div className="title-box-arrange">
              <Link to="/student/liveclass/upcomingliveclass">
                <div className="svg-with-title">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0401 0H3.95986C1.77275 0 0 1.69104 0 3.78415V21.1004C0 21.8351 0.881601 22.2647 1.50376 21.8189L5.27981 19.1125H16.0401C18.2273 19.1125 20 17.4215 20 15.3284V3.78415C20 1.69408 18.2304 0 16.0401 0ZM9.06003 14.3025H4.96653C4.44741 14.3025 4.02668 13.9005 4.02668 13.4044C4.02668 12.9083 4.44741 12.5062 4.96653 12.5062H9.06003C9.57915 12.5062 9.99988 12.9083 9.99988 13.4044C9.99988 13.9005 9.57915 14.3025 9.06003 14.3025ZM15.0335 10.4545H4.96653C4.44741 10.4545 4.02668 10.0522 4.02668 9.55639C4.02668 9.0603 4.44741 8.65824 4.96653 8.65824H15.0335C15.5523 8.65824 15.9733 9.0603 15.9733 9.55639C15.9733 10.0522 15.5526 10.4545 15.0335 10.4545ZM15.0335 6.6063H4.96653C4.44741 6.6063 4.02668 6.20424 4.02668 5.70815C4.02668 5.2123 4.44741 4.81 4.96653 4.81H15.0335C15.5523 4.81 15.9733 5.2123 15.9733 5.70815C15.9733 6.20424 15.5526 6.6063 15.0335 6.6063Z"
                      fill="#EB7926"
                    />
                  </svg>
                  <p>Upcoming Live Classes</p>
                </div>
              </Link>

              <div className="view-previous-class">
                <a
                  href={
                    "https://class.zinedu.com/WEBStudent/StudentPageAccess?StudentId=" +
                    this.state.student_id +
                    "&PageName=LiveClasses"
                  }
                >
                  View Previous Live Classes
                </a>
              </div>
            </div>
          </div>

          <div className="live-class-content-box">
            {this.state.classes.map((item) => (
              <div className="live-class-box">
                <div className="live-class-img">
                  {item.liveclass_assoc.faculty_assoc == null ? (
                    <img src={sampleImg} alt="" />
                  ) : (
                    <img src={item.liveclass_assoc.faculty_assoc} alt="" />
                  )}
                </div>

                <div className="liveName">
                  <div className="liveGrid">
                    <p className="chapter-grid">
                      {item.liveclass_assoc.chapter_assoc}
                    </p>
                    <p className="time-grid">
                      {dateFormat(
                        item.liveclass_assoc.start_date,
                        " ddd dd/mm/yyyy"
                      )}{" "}
                      <span>
                        {dateFormat(
                          item.liveclass_assoc.start_date,
                          " hh:MM tt"
                        )}
                      </span>
                    </p>
                  </div>

                  <div className="live-btns">
                    <button
                      className="replay-btn"
                      onClick={() => this.selectedOption(item.live_class_url)}
                    >
                      Replay Class
                    </button>
                    {this.state.notes_live_class_id.includes(
                      item.liveclass_assoc.id
                    ) ? (
                      <button
                        className="notes-btn"
                        onClick={() => this.onNotes(item.liveclass_assoc.id)}
                      >
                        Notes
                      </button>
                    ) : (
                      <button className="hidden-btn"></button>
                    )}
                    {this.state.assignment_live_class_id.includes(
                      item.liveclass_assoc.id
                    ) ? (
                      <button
                        className="dpp-btn"
                        onClick={() =>
                          this.onAssignment(item.liveclass_assoc.id)
                        }
                      >
                        DPP
                      </button>
                    ) : (
                      <button className="hidden-btn"></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default PastLiveClass;
