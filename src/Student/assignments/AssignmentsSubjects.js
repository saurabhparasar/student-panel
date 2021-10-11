import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./assignMe.css";

class AssignmentsSubjects extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      user: data.username,
      token: data.token,
      isloading: false,
      subjects: [],
    };
    this.baseState = this.state;
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "Assingments-Subjects");
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
    axios
      .get(
        Config.SERVER_URL +
        "users/get-student-details/?username=" +
        this.state.user,
        requestOptions1
      )
      .then((response) => {
        // console.log(response.data)
        var ch = response.data;
        axios
          .get(
            Config.SERVER_URL +
            "support/get-subject-class-binding/?is_main_subject=true&class_id=" +
            ch.student_data.section_assoc.class_assoc,
            requestOptions1
          )
          .then((response) => {
            // console.log(response.data)
            const lang = response.data;
            this.setState({
              subjects: lang,
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
  };

  onView = (item) => {
    // console.log(item)
    this.props.history.push({
      pathname: "/student/assignmentschapters",
      state: { subject: item },
    });
  };

  render() {
    return (
      <>
        <Issue />
        <Studentnav />

        <div className="assignMe-container">
          <h2>Assignments</h2>

          <div className="assignMe-content-box">
            {this.state.subjects.map((item) => (
              <div className="assignMe-box">
                <div className="assignMe-svg">
                  <svg
                    width="270"
                    height="135"
                    viewBox="0 0 292 135"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 13C0 5.8203 5.8203 0 13 0H279C286.18 0 292 5.8203 292 13V134H0V13Z"
                      fill="#6D5A8C"
                    />
                    <path
                      opacity="0.76"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M110 102.5L135.5 135H291.5V61.6467L161.5 38V98L110 102.5Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M109 31C109 30.4477 109.448 30 110 30H182C182.552 30 183 30.4477 183 31V103C183 103.552 182.552 104 182 104H110C109.448 104 109 103.552 109 103V93.4203C109 92.868 109.448 92.4203 110 92.4203H112.507C112.841 92.4203 113.146 92.5931 113.368 92.8422C114.074 93.6346 115.102 94.1335 116.247 94.1335C118.375 94.1335 120.101 92.408 120.101 90.2794C120.101 88.1508 118.375 86.4252 116.247 86.4252C115.102 86.4252 114.074 86.924 113.368 87.7161C113.146 87.9652 112.841 88.1379 112.508 88.1379H110C109.448 88.1379 109 87.6902 109 87.1379V77.6949C109 77.1426 109.448 76.6949 110 76.6949H112.507C112.841 76.6949 113.146 76.8677 113.368 77.1169C114.074 77.9092 115.102 78.4081 116.247 78.4081C118.375 78.4081 120.101 76.6826 120.101 74.554C120.101 72.4254 118.375 70.6998 116.247 70.6998C115.102 70.6998 114.074 71.1986 113.368 71.9907C113.146 72.2398 112.841 72.4125 112.508 72.4125H110C109.448 72.4125 109 71.9648 109 71.4125V61.9705C109 61.4182 109.448 60.9705 110 60.9705H112.507C112.841 60.9705 113.146 61.1433 113.368 61.3924C114.074 62.1847 115.102 62.6837 116.247 62.6837C118.375 62.6837 120.101 60.9582 120.101 58.8296C120.101 56.701 118.375 54.9754 116.247 54.9754C115.102 54.9754 114.074 55.4742 113.368 56.2663C113.146 56.5154 112.841 56.6881 112.508 56.6881H110C109.448 56.6881 109 56.2404 109 55.6881V46.5535C109 46.0013 109.448 45.5535 110 45.5535H112.507C112.841 45.5535 113.146 45.7263 113.368 45.9755C114.074 46.7678 115.102 47.2668 116.247 47.2668C118.375 47.2668 120.101 45.5412 120.101 43.4126C120.101 41.284 118.375 39.5584 116.247 39.5584C115.102 39.5584 114.074 40.0573 113.368 40.8493C113.146 41.0984 112.841 41.2711 112.508 41.2711H110C109.448 41.2711 109 40.8234 109 40.2711V31ZM128.425 48.575C128.425 48.0227 128.873 47.575 129.425 47.575H145.925C146.477 47.575 146.925 48.0227 146.925 48.575V59.525C146.925 60.0773 146.477 60.525 145.925 60.525H129.425C128.873 60.525 128.425 60.0773 128.425 59.525V48.575ZM174.675 48.575C174.675 48.0227 174.227 47.575 173.675 47.575H151.625C151.073 47.575 150.625 48.0227 150.625 48.575V49.35C150.625 49.9023 151.073 50.35 151.625 50.35H173.675C174.227 50.35 174.675 49.9023 174.675 49.35V48.575ZM150.625 57.825C150.625 57.2727 151.073 56.825 151.625 56.825H165.35C165.902 56.825 166.35 57.2727 166.35 57.825V58.6C166.35 59.1523 165.902 59.6 165.35 59.6H151.625C151.073 59.6 150.625 59.1523 150.625 58.6V57.825ZM171.9 68C171.9 67.4477 171.452 67 170.9 67H129.425C128.873 67 128.425 67.4477 128.425 68V68.775C128.425 69.3273 128.873 69.775 129.425 69.775H170.9C171.452 69.775 171.9 69.3273 171.9 68.775V68ZM128.425 76.325C128.425 75.7727 128.873 75.325 129.425 75.325H170.9C171.452 75.325 171.9 75.7727 171.9 76.325V77.1C171.9 77.6523 171.452 78.1 170.9 78.1H129.425C128.873 78.1 128.425 77.6523 128.425 77.1V76.325ZM171.9 84.65C171.9 84.0977 171.452 83.65 170.9 83.65H129.425C128.873 83.65 128.425 84.0977 128.425 84.65V85.425C128.425 85.9773 128.873 86.425 129.425 86.425H170.9C171.452 86.425 171.9 85.9773 171.9 85.425V84.65Z"
                      fill="#F0E3C1"
                    />
                    <path
                      d="M141 30H183V103C183 103.552 182.552 104 182 104H142C141.448 104 141 103.552 141 103V30Z"
                      fill="#6D5A8C"
                      fill-opacity="0.07"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="264.566"
                        y1="133.067"
                        x2="214.184"
                        y2="-14.5785"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#190835" stop-opacity="0.24" />
                        <stop
                          offset="0.1026"
                          stop-color="#3E2763"
                          stop-opacity="0.53"
                        />
                        <stop
                          offset="0.2446"
                          stop-color="#301E4E"
                          stop-opacity="0.43"
                        />
                        <stop
                          offset="0.4447"
                          stop-color="#35274E"
                          stop-opacity="0.56"
                        />
                        <stop offset="1" stop-color="#523B78" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="assignMeName">
                  <p>{item.subject_name}</p>
                  <button onClick={() => this.onView(item)}>View</button>
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
export default AssignmentsSubjects;
