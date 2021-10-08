import { Component } from "react";
import Styles from "./whoweare.module.css";
import Footer from "../Student/Footer";
import { Link } from "react-router-dom";
class whoweare extends Component {
  constructor() {
    super();
    this.state = {
      selected: "founding",
    };
  }
  clickedacademic = () => {
    this.setState({ selected: "academics" });
  };
  clickedfounder = () => {
    this.setState({ selected: "founding" });
  };
  clickedmanagement = () => {
    this.setState({ selected: "management" });
  };
  render() {
    var team;
    var teambts;
    if (this.state.selected === "founding") {
      teambts = (
        <div class="col-md-8" id={Styles.course}>
          <button
            type="button"
            className={`${Styles.btn} ${Styles.selected}`}
            id="found-button"
            onClick={this.clickedfounder}
          >
            FOUNDING TEAM
          </button>
          <button
            type="button"
            class={Styles.btn}
            id="manage-button"
            onClick={this.clickedmanagement}
          >
            MANAGEMENT TEAM
          </button>
          <button
            type="button"
            class={Styles.btn}
            id="tech-button"
            onClick={this.clickedacademic}
          >
            {" "}
            ACADEMIC TEAM
          </button>
        </div>
      );
      team = (
        <center>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="Arka-Sen.jpg"
              className={Styles.teamimg}
              src="./Arka-Sen.jpg"
            />
            <p id={Styles.text3}>Arka Sen</p>
            <p id={Styles.text4}>
              Mathematics
              <br />
              IIT Madras
              <br /> 13+ Year Experience <br /> Ex – Allen, FIITJEE
            </p>
          </div>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="Harish-Kharbanda.jpg"
              className={Styles.teamimg}
              src="./Harish-Kharbanda.jpg"
            />
            <p id={Styles.text3}>Harish Kharbanda</p>
            <p id={Styles.text4}>
              Physics <br />
              IIT Delhi
              <br /> 22+ Years of Experience
              <br /> Ex – Allen, Aryan Classes
            </p>
          </div>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="Prashant-Sharma.jpg"
              class={Styles.teamimg}
              src="Prashant-Sharma.jpg"
            />
            <p id={Styles.text3}>Prashant Sharma</p>
            <p id={Styles.text4}>
              Chemistry
              <br />
              B.Tech, IPU
              <br /> 13 Year Experience <br /> Ex - Allen, PACE, VMC, Brilliant
              Tutorials
            </p>
          </div>
        </center>
      );
    }
    if (this.state.selected === "management") {
      teambts = (
        <div class="col-md-8" id={Styles.course}>
          <button
            type="button"
            className={Styles.btn}
            id="found-button"
            onClick={this.clickedfounder}
          >
            FOUNDING TEAM
          </button>

          <button
            type="button"
            className={`${Styles.btn} ${Styles.selected}`}
            id="manage-button"
            onClick={this.clickedmanagement}
          >
            MANAGEMENT TEAM
          </button>

          <button
            type="button"
            class={Styles.btn}
            id="tech-button"
            onClick={this.clickedacademic}
          >
            {" "}
            ACADEMIC TEAM
          </button>
        </div>
      );
      team = (
        <center>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="Team"
              class={Styles.teamimg}
              src="Ashish-Mishra.jpg"
            />
            <p id={Styles.text3}>Ashish Mishra </p>
            <p id={Styles.text4}>
              Business Development
              <br />
              IIFT Delhi
              <br /> 4+ Years of Experience <br /> Ex - OYO{" "}
            </p>
          </div>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="our team"
              class={Styles.teamimg}
              src="Praveen-Burri.jpg"
            />
            <p id={Styles.text3}>Praveen Burri </p>
            <p id={Styles.text4}>
              Operations
              <br />
              IIM Luckhnow
              <br /> 15+ Years of Experience <br /> Ex - Toppr{" "}
            </p>
          </div>
          <div class="col-md-4">
            <img
              height="250px"
              width="auto"
              alt="our team"
              class={Styles.teamimg}
              src="Nishant-Tiwari.jpg"
            />
            <p id={Styles.text3}>Ashish Mishra </p>
            <p id={Styles.text4}>
              Digital Marketing
              <br />
              IIM Shillong
              <br /> 3+ Years of Experience{" "}
            </p>
          </div>
        </center>
      );
    }
    if (this.state.selected === "academics") {
      teambts = (
        <div class="col-md-8" id={Styles.course}>
          <button
            type="button"
            className={Styles.btn}
            id="found-button"
            onClick={this.clickedfounder}
          >
            FOUNDING TEAM
          </button>
          <button
            type="button"
            className={Styles.btn}
            id="manage-button"
            onClick={this.clickedmanagement}
          >
            MANAGEMENT TEAM
          </button>
          <button
            type="button"
            className={`${Styles.btn} ${Styles.selected}`}
            id="tech-button"
            onClick={this.clickedacademic}
          >
            {" "}
            ACADEMIC TEAM
          </button>
        </div>
      );
      team = (
        <center>
          <div className="row">
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Amitabh-Singh.jpg"
              />
              <p id={Styles.text3}>Amitabh Singh </p>
              <p id={Styles.text4}>
                Mathematics
                <br />
                IIT BHU
                <br /> 2+ Years of Experience <br />{" "}
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="dibyendu-sil.jpg"
              />
              <p id={Styles.text3}>Dibyendu Sil </p>
              <p id={Styles.text4}>
                Chemistry
                <br />
                Jadavpur University Chemistry
                <br /> 16+ Years of Experience <br />
                Ex-Resonance, Brilliant Tutorial{" "}
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Kumar-Mohit.jpg"
              />
              <p id={Styles.text3}>Kumar Mohit </p>
              <p id={Styles.text4}>
                IIT Guwahati
                <br />{" "}
              </p>
            </div>
          </div>
          <div className="row">
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Megha-Nariyal.jpg"
              />
              <p id={Styles.text3}>Megha Nariyal </p>
              <p id={Styles.text4}>
                Botany
                <br />
                Kumaon University
                <br /> 3+ Years of Experience <br />
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Nitin-Dixit.jpg"
              />
              <p id={Styles.text3}>Nitin Dixit</p>
              <p id={Styles.text4}>
                Mathematics
                <br />
                NIT Jalandhar <br /> 14+ Years of Experience <br />
                Ex – FIITJEE, Brilliant Tutorials{" "}
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Purushottam-Singh.jpg"
              />
              <p id={Styles.text3}>Purushottam Singh </p>
              <p id={Styles.text4}>
                Chemistry
                <br />
                IIT BHU
                <br /> 16+ Years of Experience <br />
                Ex-PACE, Bansal Classes, FIITJEE{" "}
              </p>
            </div>
          </div>
          <div className="row">
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Rohan-Jha.jpg"
              />
              <p id={Styles.text3}>Rohan Jha</p>
              <p id={Styles.text4}>
                Mathematics
                <br />
                New York University (NYU) <br /> 11+ Years of Experience <br />{" "}
                Ex - Aakash, Narayana, Allen, FIITJEE
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Santosh-Tripathi.jpg"
              />
              <p id={Styles.text3}>Santosh Tripathi</p>
              <p id={Styles.text4}>
                Physics
                <br />
                IIT DELHI <br /> 10+ Years of Experience <br />
                Ex – FIITJEE, Careers360{" "}
              </p>
            </div>
            <div class="col-md-4">
              <img
                height="250px"
                width="auto"
                alt="our team"
                class={Styles.teamimg}
                src="Sudhanshu-Shekhar.jpg"
              />
              <p id={Styles.text3}>Sudhanshu Shekhar</p>
              <p id={Styles.text4}>
                Chemistry
                <br />
                IIT Madaras
                <br /> 7+ Years of Experience <br />
                Ex-PACE{" "}
              </p>
            </div>
          </div>
        </center>
      );
    }
    return (
      <div>
        <nav className={Styles.navbar} id="navbg">
          <div class="container-fluid">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <svg
                width="195"
                height="51"
                viewBox="0 0 195 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M38.3515 23.275L0.5 12.2767L38.3515 0L76.2031 12.2767L72.7138 12.9666C72.7138 16.2134 72.7138 19.4601 72.7138 22.6865C74.0402 23.1938 74.9788 24.249 74.9788 25.9738C74.9788 27.6987 73.3872 29.4844 71.4487 29.4844C69.4898 29.4844 67.9186 27.6987 67.9186 25.9738C67.9186 24.249 68.8572 23.1938 70.204 22.6865C70.204 19.6427 70.204 16.5786 70.204 13.5348L38.3515 23.275Z"
                  fill="#2B337A"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.5417 38.3162L36.5023 42.9192V47.7063L14.1633 40.8121V36.0454L29.4297 30.8492L14.1633 26.1439V21.3568L36.5023 28.2511V28.4352V33.0177V33.2223L21.5417 38.3162ZM40.5992 42.9192L62.9383 35.6567V40.4438L40.5992 47.7063V42.9192ZM40.5992 28.2306L62.9383 20.9681V25.7552L40.5992 33.0177V28.2306ZM40.5992 35.5749V40.362L57.2516 34.9407V30.1536L40.5992 35.5749ZM38.6221 51L65.4453 42.285C65.4453 28.6193 65.4453 33.9792 65.4453 17.5312L38.5813 26.2667L11.6562 17.9609C11.6562 34.6952 11.6562 27.0032 11.6562 42.6737L38.6221 51Z"
                  fill="#029EDC"
                />
                <path
                  filRule="evenodd"
                  clipRule="evenodd"
                  d="M126.555 21.5156C123.822 21.5562 121.726 22.5717 120.534 24.765V21.6578H116.445V38.25H120.534V30.0859C120.534 27.3645 122.158 25.3336 124.932 25.3133C127.254 25.3133 128.672 26.7349 128.672 29.0704V38.25H132.781V27.8926C132.761 23.9527 130.418 21.5156 126.555 21.5156Z"
                  fill="#029EDC"
                />
                <path
                  d="M111.266 21.5156H107.281V38.25H111.266V21.5156Z"
                  fill="#029EDC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M109.473 14.7422C108.182 14.7422 107.281 15.6586 107.281 16.9336C107.281 18.2086 108.182 19.125 109.473 19.125C110.763 19.125 111.664 18.2086 111.664 16.9336C111.664 15.6586 110.742 14.7422 109.473 14.7422Z"
                  fill="#029EDC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M85.3785 16.3359L85.358 20.0019H97.8765L84.9688 35.2599V38.25H103.695V34.584H90.6441L103.531 19.2851V16.3359H85.3785Z"
                  fill="#2B337A"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M190.176 21.1172V29.4863C190.176 32.2068 188.662 34.3042 186.092 34.3458C183.901 34.3458 182.586 32.9129 182.586 30.5454V21.1172H178.602V31.7499C178.602 35.7579 180.853 38.25 184.498 38.25C187.088 38.25 189.041 37.2116 190.156 34.948V38.0838H194.141V21.1172H190.176Z"
                  fill="#029EDC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M169.782 14.7628V24.0302C168.565 22.1398 166.658 21.1123 164.101 21.1123C159.454 21.1123 156.289 24.544 156.289 29.6195C156.289 34.7362 159.454 38.25 164.202 38.25C166.678 38.25 168.606 37.2226 169.782 35.3526V38.0445H173.82V14.7422H169.782V14.7628ZM165.075 34.8184C162.275 34.8184 160.388 32.7224 160.368 29.7017C160.408 26.7221 162.315 24.5851 165.075 24.5851C167.875 24.5851 169.782 26.681 169.782 29.7017C169.782 32.7018 167.855 34.8184 165.075 34.8184Z"
                  fill="#029EDC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M137.164 34.2656V37.8516H153.5V34.2656H141.34H137.164Z"
                  fill="#2B337A"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M137.164 25.1016V28.6675H143.273V28.6875H151.906V25.1016H141.338H137.164Z"
                  fill="#2B337A"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M137.164 15.9375V19.9219H141.331H143.263H153.102V15.9375H137.164Z"
                  fill="#2B337A"
                />
              </svg>
            </div>
            <div class="collapse navbar-collapse" id={Styles.myNavbar}>
              <ul class="nav navbar-nav navbar-right" id="close">
                <li class="dropdown">
                  <a
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    href
                    id="navbarabout"
                  >
                    About Us{" "}
                    <img
                      class="x-primary-color"
                      src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/---primary-color@2x.svg"
                      alt=""
                    />
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href>One</a>
                    </li>
                    <li>
                      <a href>Two</a>
                    </li>
                    <li>
                      <a href>Three</a>
                    </li>
                  </ul>
                </li>

                <li class="dropdown">
                  <a
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    href
                    id="navbarexam"
                  >
                    Exam{" "}
                    <img
                      class="x-primary-color"
                      src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/---primary-color@2x.svg"
                      alt=""
                    />
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href>1</a>
                    </li>
                    <li>
                      <a href>2</a>
                    </li>
                    <li>
                      <a href>3</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#quiz" id="navbarquiz">
                    Quiz
                  </a>
                </li>
                <li>
                  <a href="#products" id="navbarassign">
                    My Assignment
                  </a>
                </li>
                <li>
                  <a href="#contact" id="navbarvideo">
                    Video Lectures
                  </a>
                </li>
                <i id={Styles.icon1} class="fas fa-bell"></i>
                <img
                  id="img1"
                  height="45px"
                  width="auto"
                  class="rectangle-2"
                  src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/rectangle-2@2x.jpg"
                  alt=""
                />
                <img
                  class="x-primary-color"
                  src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/---primary-color@2x.svg"
                  alt=""
                />
              </ul>
            </div>
          </div>
        </nav>

        <section class={Styles.whoweare}>
          <div class="container">
            <div class="row">
              <div class="col-md-7">
                <p id={Styles.text1}>
                  <Link to="/">Home</Link> / Who We Are
                </p>
                <p id={Styles.text2}>Who We Are</p>
                <p id={Styles.text3}>
                  We are a highly passionate team of IITians and ISBians, who
                  aspire to transform the educational landscape of the country
                  using technology and innovation.
                  <br />
                  <br /> Our core team consists of serial entrepreneurs as well
                  as people who have left the comfort of their corporate jobs to
                  follow their dreams and passion in the education domain. The
                  core team has tens of years of experience in competitive
                  coaching, technology development, and general management roles
                  at several MNCs and start-ups.
                  <br />
                  <br /> We conduct classroom training programs, live classes,
                  personalized home tuitions and school integrated programs. We
                  have tied up with leading schools in the country (such as
                  Delhi Public Schools) to provide competitive coaching and
                  teacher training services through the use of technology.
                </p>
              </div>
              <div class="col-md-5" id={Styles.gap1}>
                <img
                  height="500px"
                  width="100%auto"
                  class="mask-group"
                  src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/mask-group@1x.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section class={Styles.ourteam}>
          <div class="container">
            <p id={Styles.text1}>Our Team</p>

            <div class="row" id={Styles.gap1}>
              <div class="col-md-2"></div>

              {teambts}

              <div class="col-md-2"></div>
            </div>
            <div class="row" id={Styles.gap2}>
              {team}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
export default whoweare;
