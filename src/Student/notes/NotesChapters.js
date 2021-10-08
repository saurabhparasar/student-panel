import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./notes.css";
import Issue from "../Issue";

class NotesChapters extends Component {
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
      Main_Notes: [],
      chapters: [],
      notes: [],
    };
    this.baseState = this.state;
  }
  componentDidMount() {
    var formdata = new FormData();
    formdata.append("page_name", "Notes-Chapters");
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
        "support/get-chapters/?subject=" +
        this.props.location.state.subject.id,
        requestOptions1
      )
      .then((response) => {
        const ch = response.data;
        this.setState({
          chapters: ch,
        });
        setTimeout(() => {
          this.myfunc();
        }, 1000);
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    axios
      .get(
        Config.SERVER_URL +
        `support/get-teacher-notes/?subject=${this.props.location.state.subject.id}`,
        requestOptions1
      )
      .then((response) => {
        const ch = response.data;
        this.setState({
          notes: ch,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
  }
  myfunc = () => {
    let arr = [];
    let arr1 = [];

    for (let i = 0; i < this.state.chapters.length; i++) {
      for (let j = 0; j < this.state.notes.length; j++) {
        if (this.state.chapters[i].id === this.state.notes[j].chapter_assoc) {
          arr.push(this.state.chapters[i]);
          break;
        }
      }
    }
    for (let i = 0; i < this.state.chapters.length; i++) {
      for (let j = 0; j < this.state.notes.length; j++) {
        if (this.state.chapters[i].id === this.state.notes[j].chapter_assoc) {
          arr1.push(this.state.notes[j]);
        }
      }
    }
    this.setState({
      Main_Chapters: arr,
      Main_Notes: arr1,
    });

    this.setState({
      isloading: false,
      count: 1,
    });
  };
  onView = (item) => {
    console.log(item);
    this.props.history.push({
      pathname: "/student/notes/noteslist",
      state: { Notes: item },
    });
  };

  render() {
    return (
      <>
        <Issue />
        <Studentnav />

        <div className="notes-container">
          <h2>{this.state.subject.subject_name}</h2>

          <div className="notes-content-box">
            {this.state.Main_Chapters.map((item) => (
              <div className="notes-box">
                <div className="notes-svg">
                  <svg
                    width="270"
                    height="136"
                    viewBox="0 0 293 136"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C0 4.47715 4.47715 0 10 0H282C287.523 0 292 4.47715 292 10V134H0V10Z"
                      fill="#F9DB7F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M152.5 122.5L143 135.26H292.5V43.4302L177 24C177 24 162.14 34.2348 160 47C188.5 68 183.5 75.5 183.5 75.5C183.5 75.5 179 104 169.5 90.5C165.153 96.5635 152.5 105.5 152.5 105.5L143 98L152.5 122.5Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M146.464 24.8745H200.929V104.766L145.261 105.215"
                      fill="#D92E4B"
                    />
                    <path
                      d="M146.465 24.8744C127.252 4.90699 92 24.8744 92 24.8744V104.46C126.497 86.3084 145.25 105.215 145.25 105.215"
                      fill="#B5263F"
                    />
                    <path
                      d="M192.57 39.5135H154.572C154.265 39.5135 154.025 39.2728 154.025 38.9664C154.025 38.6601 154.265 38.4194 154.572 38.4194H192.559C192.865 38.4194 193.106 38.6601 193.106 38.9664C193.117 39.2618 192.865 39.5135 192.57 39.5135Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 44.7214H154.572C154.265 44.7214 154.025 44.4807 154.025 44.1744C154.025 43.868 154.265 43.6273 154.572 43.6273H192.559C192.865 43.6273 193.106 43.868 193.106 44.1744C193.117 44.4807 192.865 44.7214 192.57 44.7214Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 49.9403H154.572C154.265 49.9403 154.025 49.6996 154.025 49.3933C154.025 49.0869 154.265 48.8462 154.572 48.8462H192.559C192.865 48.8462 193.106 49.0869 193.106 49.3933C193.117 49.6996 192.865 49.9403 192.57 49.9403Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 55.1593H154.572C154.265 55.1593 154.025 54.9186 154.025 54.6122C154.025 54.3059 154.265 54.0652 154.572 54.0652H192.559C192.865 54.0652 193.106 54.3059 193.106 54.6122C193.117 54.9076 192.865 55.1593 192.57 55.1593Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 60.3672H154.572C154.265 60.3672 154.025 60.1265 154.025 59.8201C154.025 59.5138 154.265 59.2731 154.572 59.2731H192.559C192.865 59.2731 193.106 59.5138 193.106 59.8201C193.106 60.1265 192.865 60.3672 192.57 60.3672Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 65.5861H154.572C154.265 65.5861 154.025 65.3454 154.025 65.0391C154.025 64.7327 154.265 64.492 154.572 64.492H192.559C192.865 64.492 193.106 64.7327 193.106 65.0391C193.117 65.3345 192.865 65.5861 192.57 65.5861Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 70.794H154.572C154.265 70.794 154.025 70.5533 154.025 70.247C154.025 69.9406 154.265 69.6999 154.572 69.6999H192.559C192.865 69.6999 193.106 69.9406 193.106 70.247C193.117 70.5533 192.865 70.794 192.57 70.794Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 76.013H154.572C154.265 76.013 154.025 75.7723 154.025 75.4659C154.025 75.1596 154.265 74.9189 154.572 74.9189H192.559C192.865 74.9189 193.106 75.1596 193.106 75.4659C193.117 75.7723 192.865 76.013 192.57 76.013Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 81.2317H154.572C154.265 81.2317 154.025 80.991 154.025 80.6847C154.025 80.3783 154.265 80.1376 154.572 80.1376H192.559C192.865 80.1376 193.106 80.3783 193.106 80.6847C193.117 80.9801 192.865 81.2317 192.57 81.2317Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 86.4396H154.572C154.265 86.4396 154.025 86.1989 154.025 85.8926C154.025 85.5862 154.265 85.3455 154.572 85.3455H192.559C192.865 85.3455 193.106 85.5862 193.106 85.8926C193.117 86.1989 192.865 86.4396 192.57 86.4396Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M192.57 91.6586H154.572C154.265 91.6586 154.025 91.4179 154.025 91.1115C154.025 90.8052 154.265 90.5645 154.572 90.5645H192.559C192.865 90.5645 193.106 90.8052 193.106 91.1115C193.117 91.4179 192.865 91.6586 192.57 91.6586Z"
                      fill="#F9DB7F"
                    />
                    <path
                      d="M149.068 119.449L150.895 24.2618L146.519 24.6228L143.959 117.261L146.147 113.606L149.068 119.449Z"
                      fill="#8A1D30"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="276.984"
                        y1="109.901"
                        x2="198.927"
                        y2="-15.7198"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9DB7F" stop-opacity="0" />
                        <stop
                          offset="0.0636"
                          stop-color="#F6D87D"
                          stop-opacity="0.0636"
                        />
                        <stop
                          offset="0.3114"
                          stop-color="#EFD37A"
                          stop-opacity="0.3114"
                        />
                        <stop offset="1" stop-color="#EDD179" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="notesName">
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
export default NotesChapters;
