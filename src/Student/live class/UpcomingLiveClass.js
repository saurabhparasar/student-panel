import { Component } from "react";
import ReactLoading from "react-loading";
import Config from "../../config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./liveClass.css";
import sampleImg from "./img/math-teacher.jpg";

class UpcomingLiveClass extends Component {
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
      live_class_id: "",
      isloading: false,
    };
    this.baseState = this.state;
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "Upcoming-Live-Class");
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
        axios
          .get(
            Config.SERVER_URL +
            "student/get-scheduled-live-classes/?school=" +
            response.data.student_data.school_assoc.id +
            "&section=" +
            response.data.student_data.section_assoc.id,
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
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onJoinmeeting = (item) => {
    var formdata = new FormData();
    console.log(item.id);
    formdata.append("live_class_id", item.id);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "student/start-live-class/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.live_class_status_id);
        let variable = json.live_class_status_id;
        this.setState({
          live_class_id: variable,
        });
        if (variable) {
          window.location.href = "https://live.zinedu.com/?id=" + variable;
          // window.location.href = 'http://localhost:3001/?id='+variable;
        }
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
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
          <div className="live-class-title">
            <h2>Upcoming Live Classes</h2>

            <Link to="/student/liveclass/pastliveclass">
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
                <p>Past Live Classes</p>
              </div>
            </Link>
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
                  <button
                    style={{ alignSelf: "center" }}
                    className="upcoming-btn"
                    onClick={() => {
                      this.onJoinmeeting(item.liveclass_assoc);
                    }}
                  >
                    Join Class
                  </button>
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
export default UpcomingLiveClass;
