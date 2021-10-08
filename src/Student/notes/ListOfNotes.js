import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./notes.css";

// import subject icons
import randomSubjectIcon from "./img/RandomIcon.jpg";

class ListOfNotes extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      user: data.username,
      token: data.token,
      isloading: false,
      notes: [],
      chapter: "",
    };
    this.baseState = this.state;
  }
  componentDidMount = () => {
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
        `support/get-teacher-notes/?chapter=${this.props.location.state.Notes}`,
        requestOptions1
      )
      .then((response) => {
        const ch = response.data;
        console.log(response.data);
        this.setState({
          notes: ch,
          isloading: false,
        });
      })
      .catch((error) => {
        this.props.history.push("/error");
      });
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append("page_name", "List-Of-Notes");
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
  };
  onView = (item) => {
    console.log(item);
    window.open(item, "_blank");
  };

  render() {
    console.log(this.state.subjects);

    return (
      <>
        <Issue />
        <Studentnav />

        <div className="notes-container">
          <h2>{this.state.chapter.chapter_name}</h2>

          <div className="notes-content-box">
            {this.state.notes.map((item) => {
              return (
                <div className="notes-box">
                  <img src={randomSubjectIcon} alt="" />
                  <div className="notesName">
                    <p>{item.notes_desc}</p>
                    <button onClick={() => this.onView(item.notes_file)}>
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
export default ListOfNotes;
