import { Component, React } from "react";
import Footer from "../Student/Footer";
import Contact from "./contact";
import { Link } from "react-router-dom";
import "./land.css";
class Land extends Component {
  render() {
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    if (data === null) {
      return (
        <div className="nopad">
          <section className="home">
            <div classNameName="container-fluid">
              <nav className="navbar" id="navbg">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target="#myNavbar"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <Link to="/">
                      <img
                        className="group-1-2nsHpn"
                        src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/group-1@2x.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right" id="close">
                      <li className="dropdown">
                        <a
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          href
                        >
                          About Us{" "}
                          <img
                            className="x-primary-color-2nsHpn"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/---primary-color@2x.svg"
                            alt=""
                          />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropitem" to="/whoweare">
                              Who We Are
                            </Link>{" "}
                          </li>
                          <li>
                            <Link to="/blankpage">Contact Us</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          href
                        >
                          Exam{" "}
                          <img
                            className="x-primary-color-2nsHpn"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/---primary-color@2x.svg"
                            alt=""
                          />
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/blankpage">Objective Test Series</Link>
                          </li>
                          <li>
                            <Link to="/blankpage">Subjective Test Series</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/blankpage">My Assignment</Link>
                      </li>
                      <li>
                        <Link to="/blankpage">Video Lectures</Link>
                      </li>
                      <li>
                        <Link to="/blankpage">Live Classes</Link>
                      </li>

                      <li>
                        <Link to="/login">Sign In</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          id="img-dots"
                          className="zin-edu-we--graphic-2"
                          height="40px"
                          width="80px"
                          src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-graphic-2@2x.png"
                          alt=""
                        />
                        <p id="text1">
                          Complete solution for boosting <br />
                          your rank in JEE & NEET 2020-2021{" "}
                        </p>
                        <p id="text2">
                          unlimited free <br />
                          practice tests
                        </p>
                        <p id="text3">for JEE Main & NEET</p>
                        <button type="button" className="btn" id="reg-button">
                          REGISTER NOW
                        </button>
                      </div>
                      <div className="col-md-6">
                        <div id="image1">
                          <img
                            className="zin-edu-we-lustration"
                            height="455px"
                            width="auto"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration@1x.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          id="img-dots"
                          className="zin-edu-we--graphic-2"
                          height="40px"
                          width="80px"
                          src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-graphic-2@2x.png"
                          alt=""
                        />
                        <p id="text4">cbse </p>
                        <p id="text5">Study materials</p>
                        <p id="text6">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                        <button type="button" className="btn" id="reg-button">
                          REGISTER NOW
                        </button>
                      </div>
                      <div className="col-md-6">
                        <div id="image1">
                          <img
                            className="zin-edu-we-lustration"
                            height="455px"
                            width="auto"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration@1x.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          id="img-dots"
                          className="zin-edu-we--graphic-2"
                          height="40px"
                          width="80px"
                          src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-graphic-2@2x.png"
                          alt=""
                        />
                        <p id="text4">Boost </p>
                        <p id="text5">your IIT JEE prepration</p>
                        <p id="text6">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                        <button type="button" className="btn" id="reg-button">
                          REGISTER NOW
                        </button>
                      </div>
                      <div className="col-md-6">
                        <div id="image1">
                          <img
                            className="zin-edu-we-lustration"
                            height="455px"
                            width="auto"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration@1x.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          id="img-dots"
                          className="zin-edu-we--graphic-2"
                          height="40px"
                          width="80px"
                          src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-graphic-2@2x.png"
                          alt=""
                        />
                        <p id="text4">Boost </p>
                        <p id="text5">your nEET prepration</p>
                        <p id="text6">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                        <button type="button" className="btn" id="reg-button">
                          REGISTER NOW
                        </button>
                      </div>
                      <div className="col-md-6">
                        <div id="image1">
                          <img
                            className="zin-edu-we-lustration"
                            height="455px"
                            width="auto"
                            src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration@1x.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                  <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>
              </div>
            </div>
          </section>

          <section className="about">
            <div className="container-fluid">
              <div className="row" id="gap1">
                <div className="col-sm-6" id="gap2">
                  <p id="text1">
                    Live
                    <br /> Interactive classes
                    <br /> with The Best <br /> Teachers
                  </p>
                  <button type="button" className="btn" id="demo-button">
                    TAKE A DEMO CLASS
                  </button>
                </div>
                <div className="col-sm-3">
                  <svg
                    id="img1"
                    width="69"
                    height="63"
                    viewBox="0 0 69 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.169922"
                      y="0.619873"
                      width="68.73"
                      height="61.7701"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0"
                          transform="scale(0.0126582 0.0140845)"
                        />
                      </pattern>
                      <image
                        id="image0"
                        width="79"
                        height="71"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>

                  <p id="text2">
                    Rich Learning
                    <br /> experience via
                    <br /> multimedia
                    <br /> content
                  </p>
                  <br />
                  <br />
                  <br />
                  <svg
                    id="img2"
                    width="93"
                    height="74"
                    viewBox="0 0 93 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.300049"
                      y="0.140015"
                      width="92.22"
                      height="73.08"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0"
                          transform="scale(0.00943396 0.0119048)"
                        />
                      </pattern>
                      <image
                        id="image0"
                        width="106"
                        height="84"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>

                  <p id="text3">
                    A real interactive
                    <br /> classNameroom
                    <br /> experience with
                    <br /> video quizzes
                    <br /> & more
                  </p>
                </div>
                <div className="col-sm-3" id="gap3">
                  <svg
                    id="img3"
                    width="68"
                    height="70"
                    viewBox="0 0 68 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.169922"
                      y="0.319946"
                      width="66.9899"
                      height="69.5999"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0"
                          transform="scale(0.012987 0.0125)"
                        />
                      </pattern>
                      <image
                        id="image0"
                        width="77"
                        height="80"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>

                  <p id="text4">
                    Clearing of
                    <br /> doubts
                    <br /> using 'Chat'
                    <br /> with teachers
                  </p>
                  <br />
                  <br />
                  <br />
                  <svg
                    id="img2"
                    width="68"
                    height="70"
                    viewBox="0 0 68 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.169922"
                      y="0.319946"
                      width="66.9899"
                      height="69.5999"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0"
                          transform="scale(0.012987 0.0125)"
                        />
                      </pattern>
                      <image
                        id="image0"
                        width="77"
                        height="80"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>

                  <p id="text5">
                    Assignment
                    <br /> and homework
                    <br /> after every className
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="courses">
            <div className="container">
              <div className="row" id="gap1">
                <div className="col-md-2"></div>
                <div className="col-md-8" id="course-buttons">
                  <button
                    type="button"
                    className="btn selected"
                    id="neet-button"
                    onClick={this.one}
                    ref="neetbutton"
                  >
                    NEET XII
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="jeet-button"
                    onClick={this.two}
                  >
                    JEE MAINS XII
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="found-button"
                    onClick={this.three}
                  >
                    IXth FOUNDATION
                  </button>
                </div>
                <div className="col-md-2"></div>
              </div>
              <div className="row" id="gap2">
                <center>
                  <div className="col-md-4">
                    <div className="box1">
                      <i id="icon1" className="far fa-play-circle"></i>
                      <img src="6.jpg" height="230px" width="300px" alt="" />
                      <p id="text1">NEET XII</p>
                      <br />
                      <div className="row">
                        <div className="col-xs-6">
                          <p id="text2">
                            <i
                              style={{ color: "black" }}
                              className="fas fa-book-open"
                            ></i>{" "}
                            38 Lessons
                          </p>
                        </div>
                        <div className="col-xs-6">
                          <p id="text3">
                            <i
                              style={{ color: "black" }}
                              className="far fa-calendar-alt"
                            ></i>{" "}
                            10, Oct, 2020
                          </p>
                        </div>
                      </div>
                      <br />
                      <p id="text4">LECTURE - 7 (THE SOLID STATE)</p>
                      <br />
                      <p id="text5">Read More...</p>
                      <br />
                      <button type="button" className="btn">
                        ENROLL NOW
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box2">
                      <i id="icon1" className="far fa-play-circle"></i>
                      <img src="6.jpg" height="230px" width="300px" alt="" />
                      <p id="text1">NEET XII</p>
                      <br />
                      <div className="row">
                        <div className="col-xs-6">
                          <p id="text2">
                            <i
                              style={{ color: "lightgrey" }}
                              className="fas fa-book-open"
                            ></i>{" "}
                            38 Lessons
                          </p>
                        </div>
                        <div className="col-xs-6">
                          <p id="text3">
                            <i
                              style={{ color: "lightgrey" }}
                              className="far fa-calendar-alt"
                            ></i>{" "}
                            10, Oct, 2020
                          </p>
                        </div>
                      </div>
                      <br />
                      <p id="text4">LECTURE - 7 (THE SOLID STATE)</p>
                      <br />
                      <p id="text5">Read More...</p>
                      <br />
                      <button type="button" className="btn">
                        ENROLL NOW
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box3">
                      <i id="icon1" className="far fa-play-circle"></i>

                      <img src="6.jpg" height="230px" width="300px" alt="" />
                      <p id="text1">NEET XII</p>
                      <br />
                      <div className="row">
                        <div className="col-xs-6">
                          <p id="text2">
                            <i
                              style={{ color: "black" }}
                              className="fas fa-book-open"
                            ></i>{" "}
                            38 Lessons
                          </p>
                        </div>
                        <div className="col-xs-6">
                          <p id="text3">
                            <i
                              style={{ color: "black" }}
                              className="far fa-calendar-alt"
                            ></i>{" "}
                            10, Oct, 2020
                          </p>
                        </div>
                      </div>
                      <br />
                      <p id="text4">LECTURE - 7 (THE SOLID STATE)</p>
                      <br />
                      <p id="text5">Read More...</p>
                      <br />
                      <button type="button" className="btn">
                        ENROLL NOW
                      </button>
                    </div>
                  </div>
                </center>
              </div>
            </div>
          </section>

          <section className="video">
            <div className="container">
              <div className="row" id="big">
                <div className="col-md-2"></div>
                <div className="col-md-8" id="gap1">
                  <p id="text1">ZinEdu Online Video Learning</p>
                  <p id="text2">
                    Prepare better with comprehensive video courses
                  </p>
                  <div className="row" id="group1">
                    <div className="col-md-2">
                      <center>
                        <svg
                          id="img1"
                          width="105"
                          height="92"
                          viewBox="0 0 105 92"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.592041"
                            y="0.152679"
                            width="103.771"
                            height="91.4348"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.00699301 0.00793651)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="143"
                              height="126"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </center>
                    </div>
                    <div className="col-md-8">
                      <p id="text3">Live interactive classNamees</p>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                  <div className="row" id="group2">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <p id="text4">Over 200 Quizzes and Tests</p>
                    </div>
                    <div className="col-md-2">
                      <center>
                        <svg
                          id="img2"
                          width="71"
                          height="91"
                          viewBox="0 0 71 91"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.432068"
                            y="0.198425"
                            width="70.3903"
                            height="90.7091"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.0103093 0.008)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="97"
                              height="125"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </center>
                    </div>
                  </div>
                  <div className="row" id="group3">
                    <div className="col-md-2">
                      <center>
                        <svg
                          id="img3"
                          width="106"
                          height="92"
                          viewBox="0 0 106 92"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.220459"
                            y="0.51825"
                            width="105.223"
                            height="91.435"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.00689655 0.00793651)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="145"
                              height="126"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </center>
                    </div>
                    <div className="col-md-8">
                      <p id="text5">Day-wise Preparation Plan</p>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                  <div className="row" id="group4">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <p id="text6">Discussion Board For Clear Doubts</p>
                    </div>
                    <div className="col-md-2">
                      <center>
                        <svg
                          id="img4"
                          width="92"
                          height="91"
                          viewBox="0 0 92 91"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.706421"
                            y="0.271851"
                            width="90.7092"
                            height="90.7091"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.008)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="125"
                              height="125"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </center>
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <img
                    id="img6"
                    className="illustration-right"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/illustration-right@2x.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="row" id="small">
                <div className="col-md-2"></div>
                <div className="col-md-8" id="gap1">
                  <p id="text1">ZinEdu Online Video Learning</p>
                  <p id="text2">
                    Prepare better with comprehensive video courses
                  </p>
                  <div className="row" id="group1">
                    <center>
                      <div className="col-md-2">
                        <svg
                          id="img1"
                          width="105"
                          height="92"
                          viewBox="0 0 105 92"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.592041"
                            y="0.152679"
                            width="103.771"
                            height="91.4348"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.00699301 0.00793651)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="143"
                              height="126"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </div>
                      <div className="col-md-8">
                        <p id="text3">Live interactive classNamees</p>
                      </div>
                    </center>
                    <div className="col-md-2"></div>
                  </div>
                  <div className="row" id="group2">
                    <div className="col-md-2"></div>
                    <center>
                      <div className="col-md-2">
                        <svg
                          id="img2"
                          width="71"
                          height="91"
                          viewBox="0 0 71 91"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.432068"
                            y="0.198425"
                            width="70.3903"
                            height="90.7091"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.0103093 0.008)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="97"
                              height="125"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </div>
                      <div className="col-md-8">
                        <p id="text4">Over 200 Quizzes and Tests</p>
                      </div>
                    </center>
                  </div>
                  <div className="row" id="group3">
                    <center>
                      <div className="col-md-2">
                        <svg
                          id="img3"
                          width="106"
                          height="92"
                          viewBox="0 0 106 92"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.220459"
                            y="0.51825"
                            width="105.223"
                            height="91.435"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.00689655 0.00793651)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="145"
                              height="126"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </div>
                      <div className="col-md-8">
                        <p id="text5">Day-wise Preparation Plan</p>
                      </div>
                    </center>
                    <div className="col-md-2"></div>
                  </div>
                  <div className="row" id="group4">
                    <div className="col-md-2"></div>
                    <center>
                      <div className="col-md-2">
                        <svg
                          id="img4"
                          width="92"
                          height="91"
                          viewBox="0 0 92 91"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            x="0.706421"
                            y="0.271851"
                            width="90.7092"
                            height="90.7091"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0"
                                transform="scale(0.008)"
                              />
                            </pattern>
                            <image
                              id="image0"
                              width="125"
                              height="125"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </div>
                      <div className="col-md-8">
                        <p id="text6">Discussion Board For Clear Doubts</p>
                      </div>
                    </center>
                  </div>
                </div>

                <center>
                  <div className="col-md-2">
                    <img
                      id="img6"
                      className="illustration-right"
                      src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/illustration-right@2x.png"
                      alt=""
                    />
                  </div>
                </center>
              </div>
            </div>
          </section>

          <section className="test">
            <div className="container">
              <p id="text1">ZinEdu Test Series</p>
              <p id="text2">
                Attempt our Exam-Wise tests Daily to improve your score
              </p>
              <div className="row" id="gap1">
                <div className="col-md-6">
                  <center>
                    <img
                      id="img1"
                      height="310px"
                      className="zin-edu-we-tration-12"
                      src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration-12@2x.png"
                      alt=""
                    />
                  </center>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-xs-1">
                      <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="col-xs-11">
                      <p id="text3">Designed by exam experts</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-1">
                      <i className="fas fa-book-open"></i>
                    </div>
                    <div className="col-xs-11">
                      <p id="text3">Based on the latest exam pattern</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-1">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <div className="col-xs-11">
                      <p id="text3">Detailed solution & performance analysis</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-1">
                      <i className="fas fa-crosshairs"></i>
                    </div>
                    <div className="col-xs-11">
                      <p id="text3">All India rank & scorecard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="testimonials">
            <img
              id="img7"
              height="200px"
              width="auto"
              className="zin-edu-we-tration-11"
              src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/zinedu-website-illustration-11@2x.png"
              alt=""
            />
            <div className="container">
              <p id="text1">TESTIMONIALS</p>
              <p id="text2">They Are Happy</p>
              <div className="row" id="gap1">
                <div className="col-md-1">
                  <img
                    id="img6"
                    height="80px"
                    width="auto"
                    className="ellipse-2045"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2045@2x.jpg"
                    alt=""
                  />
                </div>
                <div className="col-md-2">
                  <img
                    id="img5"
                    height="100px"
                    width="auto"
                    className="ellipse-2046"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2046@2x.jpg"
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <img
                    id="img4"
                    height="100px"
                    width="auto"
                    className="ellipse-2049"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2049@2x.jpg"
                    alt=""
                  />
                  <div id="box1">
                    <p id="text3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <p id="text4">Albert Flores</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <center>
                    <img
                      id="img1"
                      height="120px"
                      width="auto"
                      className="ellipse-2050"
                      src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2050@2x.jpg"
                      alt=""
                    />
                  </center>
                  <div id="box1">
                    <p id="text3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <p id="text4">Albert Flores</p>
                  </div>
                </div>
                <div className="col-md-1">
                  <img
                    id="img2"
                    height="80px"
                    width="auto"
                    className="ellipse-2047"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2047@2x.jpg"
                    alt=""
                  />
                  <img
                    id="img3"
                    height="80px"
                    width="auto"
                    className="ellipse-2048"
                    src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5fed67c3c303bd492582d63e/img/ellipse-2048@2x.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <Contact />
          <Footer />
        </div>
      );
    } else {
      this.props.history.push("/" + data.permission);
      return null;
    }
  }
}
export default Land;
