import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./notes.css";

class NotesSubjects extends Component {
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
    formdata.append("page_name", "Notes-Subjects");
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
        var ch = response.data;
        axios
          .get(
            Config.SERVER_URL +
            "support/get-subject-class-binding/?is_main_subject=true&class_id=" +
            ch.student_data.section_assoc.class_assoc,
            requestOptions1
          )
          .then((response) => {
            console.log(response.data);
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
    console.log(item);
    this.props.history.push({
      pathname: "/student/notes/noteschapters",
      state: { subject: item },
    });
  };

  render() {
    return (
      <>
        <Issue />
        <Studentnav />

        <div className="notes-container">
          <h2>Notes</h2>

          <div className="notes-content-box">
            {this.state.subjects.map((item) => (
              <div className="notes-box">
                <div className="notes-svg">
                  <svg
                    width="270"
                    height="135"
                    viewBox="0 0 293 135"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C0 4.47715 4.47715 0 10 0H283C288.523 0 293 4.47715 293 10V135H0V10Z"
                      fill="#6D2F48"
                    />
                    <path
                      opacity="0.76"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M111.5 101.5L137 134H293V60.6467L163 37V97L111.5 101.5Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M181.481 31.9C182.211 32.65 182.661 33.69 182.651 34.82C182.621 37.1 180.751 38.92 178.471 38.9C176.191 38.87 174.361 37 174.391 34.72C174.401 33.58 174.871 32.55 175.621 31.82L168.901 31.74C169.631 32.49 170.081 33.53 170.061 34.67C170.031 36.95 168.161 38.77 165.881 38.75C163.601 38.72 161.781 36.85 161.801 34.57C161.811 33.43 162.291 32.41 163.041 31.67L156.231 31.59C156.971 32.34 157.411 33.38 157.391 34.51C157.361 36.79 155.491 38.62 153.211 38.59C150.931 38.56 149.101 36.69 149.131 34.41C149.141 33.28 149.621 32.25 150.371 31.52L143.641 31.44C144.371 32.19 144.821 33.23 144.801 34.36C144.771 36.64 142.901 38.47 140.621 38.44C138.341 38.41 136.511 36.54 136.541 34.26C136.551 33.12 137.031 32.1 137.781 31.37L131.051 31.29C131.781 32.04 132.241 33.08 132.221 34.22C132.191 36.5 130.311 38.32 128.031 38.3C125.751 38.27 123.931 36.4 123.951 34.12C123.971 32.98 124.431 31.95 125.191 31.22L118.461 31.14C119.191 31.89 119.631 32.93 119.621 34.06C119.621 34.32 119.591 34.57 119.541 34.82C119.161 36.73 117.461 38.17 115.441 38.14C113.161 38.11 111.341 36.24 111.371 33.96C111.381 32.82 111.851 31.8 112.601 31.07L106.791 31L106.001 94.43C105.931 100.08 110.451 104.71 116.091 104.78L157.451 105.29L175.701 105.51C181.341 105.58 185.971 101.06 186.051 95.42L186.831 31.98L181.481 31.9ZM180.711 85.49L146.591 85.07L111.421 84.63C110.901 84.62 110.481 84.19 110.481 83.68C110.491 83.16 110.921 82.74 111.441 82.75L145.571 83.17L180.741 83.6C181.271 83.61 181.681 84.03 181.681 84.56C181.671 85.08 181.241 85.5 180.711 85.49ZM180.841 75.27L141.061 74.78L111.551 74.41C111.021 74.4 110.601 73.97 110.611 73.45C110.621 72.93 111.051 72.51 111.571 72.52L140.041 72.87L180.871 73.37C181.401 73.38 181.821 73.8 181.811 74.33C181.791 74.86 181.361 75.28 180.841 75.27ZM180.961 65.06L135.521 64.49L111.671 64.19C111.141 64.18 110.731 63.76 110.731 63.24C110.741 62.72 111.171 62.3 111.691 62.31L134.491 62.59L180.981 63.17C181.511 63.18 181.931 63.6 181.921 64.13C181.921 64.64 181.491 65.06 180.961 65.06ZM181.091 54.84L129.981 54.21L111.791 53.99C111.271 53.98 110.851 53.56 110.851 53.03C110.861 52.51 111.291 52.09 111.811 52.1L128.951 52.31L181.111 52.96C181.641 52.97 182.061 53.4 182.051 53.92C182.041 54.43 181.611 54.84 181.091 54.84Z"
                      fill="#F9DB7F"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="266.066"
                        y1="132.067"
                        x2="215.684"
                        y2="-15.5785"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#6D2F48" stop-opacity="0" />
                        <stop
                          offset="0.1026"
                          stop-color="#5E293E"
                          stop-opacity="0.1026"
                        />
                        <stop
                          offset="0.2446"
                          stop-color="#532437"
                          stop-opacity="0.2446"
                        />
                        <stop
                          offset="0.4447"
                          stop-color="#4C2132"
                          stop-opacity="0.4447"
                        />
                        <stop offset="1" stop-color="#4A2031" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="notesName">
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
export default NotesSubjects;
