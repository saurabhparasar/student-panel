import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./assignMe.css";

class AssignmentsChapters extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      user: data.username,
      token: data.token,
      isloading: false,
      subject: "",
      section_assoc: "",
      class_assoc: "",
      SubjectName: "",
      Main_Chapters: [],
      chapters: [],
    };
    this.baseState = this.state;
  }
  componentDidMount() {
    console.log(this.props.location.state.subject);
    var formdata = new FormData();
    formdata.append("page_name", "Assignments-Chapters");
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
    this.setState({
      subject: this.props.location.state.subject,
      SubjectName: this.props.location.state.subject.subject_name,
    });
    axios
      .get(
        Config.SERVER_URL +
        "users/get-student-details/?username=" +
        this.state.user,
        requestOptions1
      )
      .then((response) => {
        var ch = response.data;
        this.setState({
          section_assoc: ch.student_data.section_assoc.id,
          class_assoc: ch.student_data.section_assoc.class_assoc,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    axios
      .get(
        Config.SERVER_URL +
        `support/get-assignments-chapters/?subject=${this.props.location.state.subject.id}&student=${this.state.user}`,
        requestOptions1
      )
      .then((response) => {
        const ch = response.data;
        this.setState({
          chapters: ch,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  }

  onView = (item) => {
    // console.log(item)
    this.props.history.push({
      pathname: "/student/assignmentslist",
      state: { chapter: item, exam_type: 2 },
    });
  };

  render() {
    return (
      <>
        <Issue />
        <Studentnav />

        <div className="assignMe-container">
          <h2>{this.state.subject.subject_name}</h2>

          <div className="assignMe-content-box">
            {this.state.chapters.map((item) => (
              <div className="assignMe-box">
                <div className="assignMe-svg">
                  <svg
                    width="270"
                    height="134"
                    viewBox="0 0 292 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 13C0 5.8203 5.8203 0 13 0H279C286.18 0 292 5.8203 292 13V134H0V13Z"
                      fill="#25414C"
                    />
                    <path
                      opacity="0.76"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M122 97L135.5 134H291.5V60.6467L165.5 41V97H122Z"
                      fill="url(#paint0_linear)"
                      fill-opacity="0.35"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M165 30H154.684V33.8335C155.565 34.3432 156.157 35.2955 156.157 36.3863C156.157 38.014 154.838 39.3336 153.21 39.3336C151.582 39.3336 150.263 38.014 150.263 36.3863C150.263 35.2951 150.856 34.3425 151.737 33.8329V30H141.421V33.8335C142.302 34.3432 142.895 35.2955 142.895 36.3863C142.895 38.014 141.575 39.3336 139.947 39.3336C138.32 39.3336 137 38.014 137 36.3863C137 35.2951 137.593 34.3425 138.474 33.8329V30H128.158V33.8335C129.039 34.3432 129.632 35.2956 129.632 36.3863C129.632 38.0141 128.312 39.3336 126.684 39.3336C125.057 39.3336 123.737 38.0141 123.737 36.3863C123.737 35.2952 124.33 34.3425 125.211 33.833V30H124.429C122.989 30 121.608 30.5305 120.59 31.4748C119.572 32.4191 119 33.6998 119 35.0353V98.9647C119 100.3 119.572 101.581 120.59 102.525C121.608 103.469 122.989 104 124.429 104H168.57C170.01 104 171.391 103.469 172.409 102.525C173.428 101.58 174 100.299 174 98.9637V35.0353C174 33.6998 173.428 32.4191 172.41 31.4748C171.392 30.5305 170.011 30 168.571 30H167.947V33.8335C168.828 34.3432 169.42 35.2955 169.42 36.3863C169.42 38.014 168.1 39.3336 166.473 39.3336C164.845 39.3336 163.525 38.014 163.525 36.3863C163.525 35.2951 164.118 34.3425 165 33.8329V30ZM131.393 59.1867C130.289 59.1867 129.393 60.0822 129.393 61.1867C129.393 62.2913 130.289 63.1867 131.393 63.1867H161.254C162.359 63.1867 163.254 62.2913 163.254 61.1867C163.254 60.0822 162.359 59.1867 161.254 59.1867H131.393ZM129.393 69.8619C129.393 68.7573 130.289 67.8619 131.393 67.8619H161.254C162.359 67.8619 163.254 68.7573 163.254 69.8619C163.254 70.9664 162.359 71.8619 161.254 71.8619H131.393C130.289 71.8619 129.393 70.9664 129.393 69.8619ZM131.393 76.5362C130.289 76.5362 129.393 77.4317 129.393 78.5362C129.393 79.6408 130.289 80.5362 131.393 80.5362H150.59C151.694 80.5362 152.59 79.6408 152.59 78.5362C152.59 77.4317 151.694 76.5362 150.59 76.5362H131.393Z"
                      fill="#E7D9BD"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="264.566"
                        y1="132.067"
                        x2="214.184"
                        y2="-15.5785"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#020B3F" stop-opacity="0" />
                        <stop
                          offset="0.1026"
                          stop-color="#020B3F"
                          stop-opacity="0.1026"
                        />
                        <stop
                          offset="0.2446"
                          stop-color="#020B3F"
                          stop-opacity="0.2446"
                        />
                        <stop
                          offset="0.4447"
                          stop-color="#020B3F"
                          stop-opacity="0.4447"
                        />
                        <stop offset="1" stop-color="#020B3F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="assignMeName">
                  <p>{item.chapter_name}</p>
                  <button onClick={() => this.onView(item.id)}>View</button>
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
export default AssignmentsChapters;
