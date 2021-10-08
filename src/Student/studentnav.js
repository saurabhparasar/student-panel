import { Component } from "react";
// import Styles from './schoolnav.module.css';
import Styles from "./studentnav.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Logo from "../landing/img/zineduLogo.png"

class Studentnav extends Component {
  Logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <nav class={Styles.navbar}>
          <div class="container-fluid" style={{ margin: "0 30px 0 30px" }}>
            <div class="navbar-header">
              <button
                type="button"
                id={Styles.btn1}
                class="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <Link to="/">
                <img src={Logo} alt="logo" id={Styles.img1} width="190px" />
              </Link>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right" id="close">
                <div id={Styles.collapsed}>
                  <li>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 1 },
                      }}
                    >
                      <a href> My Test </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 2 },
                      }}
                    >
                      <a href> My Assignment </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 3 },
                      }}
                    >
                      <a href> My Quiz </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/student/Myschedule">
                      <a href> My Schedule </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/student/profile">
                      <a href> My Profile </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/student/changepassword">
                      <a href> Change Password </a>
                    </Link>
                  </li>
                  <li>
                    <a href>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          marginLeft: "4px"
                        }}
                        onClick={this.Logout}
                      >
                        Logout
                      </button>
                    </a>
                  </li>
                </div>

                <div class={Styles.dropdown}>
                  <Link
                    to="/"
                    style={{
                      border: "none",
                      background: "none",
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      marginRight: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Home
                  </Link>
                </div>

                <div class={Styles.dropdown}>
                  <Link
                    to="/student/Myschedule"
                    style={{
                      border: "none",
                      background: "none",
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      marginRight: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    My Schedule
                  </Link>
                </div>

                <div class={Styles.dropdown}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      marginRight: "20px",
                    }}
                  >
                    My Content <i class="fas fa-angle-down"></i>
                  </button>

                  <div class={Styles.dropdownContent}>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 1 },
                      }}
                    >
                      My Test
                    </Link>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 2 },
                      }}
                    >
                      My Assignment
                    </Link>
                    <Link
                      to={{
                        pathname: "/student/objectivetest",
                        state: { exam_type: 3 },
                      }}
                    >
                      My Quiz
                    </Link>
                  </div>
                </div>
                <div class={Styles.dropdown}>
                  <button class={Styles.dropbtn}>
                    <i class="fas fa-user" id={Styles.icon1}></i>
                  </button>

                  <div class={Styles.dropdownContent}>
                    <Link to="/student/profile">My Profile</Link>
                    <Link to="/student/feesummary">Fee Summary</Link>
                    <Link to="/student/changepassword">Change Password</Link>
                    <a href style={{ cursor: 'pointer' }} onClick={this.Logout}>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          fontFamily: "Montserrat",
                          fontSize: "13px",
                        }}
                      >
                        Logout
                      </button>
                    </a>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Studentnav);
