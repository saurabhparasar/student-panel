import { Component } from "react";
import Config from "../../config.json";
import axios from "axios";
import Issue from "../Issue";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./study.css";

class StudyMaterialSubject extends Component {
    constructor() {
        super();
        let data = localStorage.getItem("userdetail");
        data = JSON.parse(data);
        this.state = {
            user: data.username,
            token: data.token,
            isloading: false,
            subjects: [],
            sectionid: "",
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
                console.log(response.data);
                this.setState({
                    sectionid: response.data.student_data.section_assoc.id,
                });
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
            pathname: "/student/StudyMaterialList",
            state: {
                subject: item,
                sectionid: this.state.sectionid,
            },
        });
    };

    render() {
        return (
            <>
                <Issue />
                <Studentnav />

                <div className="study-material-container">
                    <h2>List of Subject</h2>

                    <div className="study-material-content-box">
                        {this.state.subjects.map((item) => (
                            <div className="study-material-box">
                                <div className="study-material-svg">
                                    <svg
                                        width="270"
                                        height="134"
                                        viewBox="0 0 292 134"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 13C0 5.8203 5.8203 0 13 0H279C286.18 0 292 5.8203 292 13V134H0V13Z"
                                            fill="#2C3687"
                                        />
                                        <path
                                            opacity="0.76"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M135.5 97V134H291.5V60.6467L161.5 51.5V97H135.5Z"
                                            fill="url(#paint0_linear)"
                                            fill-opacity="0.36"
                                        />
                                        <rect
                                            x="114"
                                            y="43.1112"
                                            width="54.5185"
                                            height="64.8889"
                                            rx="4"
                                            stroke="#F9DB7F"
                                            stroke-width="2"
                                        />
                                        <mask id="path-4-inside-1" fill="white">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M120.259 29V96.4444C120.259 98.6536 122.05 100.444 124.259 100.444H174.592C176.801 100.444 178.592 98.6536 178.592 96.4444V52.0643C178.592 51.0034 178.171 49.986 177.421 49.2358L154.356 26.1716C153.606 25.4214 152.589 25 151.528 25H124.259C122.05 25 120.259 26.7909 120.259 29ZM130.63 57.1851C130.63 56.6328 131.077 56.1851 131.63 56.1851H166.444C166.997 56.1851 167.444 56.6328 167.444 57.1851C167.444 57.7373 166.997 58.1851 166.444 58.1851H131.63C131.077 58.1851 130.63 57.7373 130.63 57.1851ZM131.63 62.4075C131.077 62.4075 130.63 62.8552 130.63 63.4075C130.63 63.9598 131.077 64.4075 131.63 64.4075H166.444C166.997 64.4075 167.444 63.9598 167.444 63.4075C167.444 62.8552 166.997 62.4075 166.444 62.4075H131.63ZM130.63 70.1486C130.63 69.5963 131.077 69.1486 131.63 69.1486H166.444C166.997 69.1486 167.444 69.5963 167.444 70.1486C167.444 70.7008 166.997 71.1486 166.444 71.1486H131.63C131.077 71.1486 130.63 70.7008 130.63 70.1486ZM131.63 75.8888C131.077 75.8888 130.63 76.3365 130.63 76.8888C130.63 77.4411 131.077 77.8888 131.63 77.8888H166.444C166.997 77.8888 167.444 77.4411 167.444 76.8888C167.444 76.3365 166.997 75.8888 166.444 75.8888H131.63Z"
                                            />
                                        </mask>
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M120.259 29V96.4444C120.259 98.6536 122.05 100.444 124.259 100.444H174.592C176.801 100.444 178.592 98.6536 178.592 96.4444V52.0643C178.592 51.0034 178.171 49.986 177.421 49.2358L154.356 26.1716C153.606 25.4214 152.589 25 151.528 25H124.259C122.05 25 120.259 26.7909 120.259 29ZM130.63 57.1851C130.63 56.6328 131.077 56.1851 131.63 56.1851H166.444C166.997 56.1851 167.444 56.6328 167.444 57.1851C167.444 57.7373 166.997 58.1851 166.444 58.1851H131.63C131.077 58.1851 130.63 57.7373 130.63 57.1851ZM131.63 62.4075C131.077 62.4075 130.63 62.8552 130.63 63.4075C130.63 63.9598 131.077 64.4075 131.63 64.4075H166.444C166.997 64.4075 167.444 63.9598 167.444 63.4075C167.444 62.8552 166.997 62.4075 166.444 62.4075H131.63ZM130.63 70.1486C130.63 69.5963 131.077 69.1486 131.63 69.1486H166.444C166.997 69.1486 167.444 69.5963 167.444 70.1486C167.444 70.7008 166.997 71.1486 166.444 71.1486H131.63C131.077 71.1486 130.63 70.7008 130.63 70.1486ZM131.63 75.8888C131.077 75.8888 130.63 76.3365 130.63 76.8888C130.63 77.4411 131.077 77.8888 131.63 77.8888H166.444C166.997 77.8888 167.444 77.4411 167.444 76.8888C167.444 76.3365 166.997 75.8888 166.444 75.8888H131.63Z"
                                            fill="#F9DB7F"
                                        />
                                        <path
                                            d="M177.421 49.2358L176.714 49.9429L177.421 49.2358ZM154.356 26.1716L155.064 25.4645L155.064 25.4645L154.356 26.1716ZM121.259 96.4444V29H119.259V96.4444H121.259ZM124.259 99.4444C122.602 99.4444 121.259 98.1013 121.259 96.4444H119.259C119.259 99.2059 121.497 101.444 124.259 101.444V99.4444ZM174.592 99.4444H124.259V101.444H174.592V99.4444ZM177.592 96.4444C177.592 98.1013 176.249 99.4444 174.592 99.4444V101.444C177.354 101.444 179.592 99.2059 179.592 96.4444H177.592ZM177.592 52.0643V96.4444H179.592V52.0643H177.592ZM176.714 49.9429C177.276 50.5056 177.592 51.2686 177.592 52.0643H179.592C179.592 50.7382 179.065 49.4664 178.128 48.5287L176.714 49.9429ZM153.649 26.8787L176.714 49.9429L178.128 48.5287L155.064 25.4645L153.649 26.8787ZM151.528 26C152.324 26 153.087 26.3161 153.649 26.8787L155.064 25.4645C154.126 24.5268 152.854 24 151.528 24V26ZM124.259 26H151.528V24H124.259V26ZM121.259 29C121.259 27.3431 122.602 26 124.259 26V24C121.497 24 119.259 26.2386 119.259 29H121.259ZM131.63 55.1851C130.525 55.1851 129.63 56.0805 129.63 57.1851H131.63V55.1851ZM166.444 55.1851H131.63V57.1851H166.444V55.1851ZM168.444 57.1851C168.444 56.0805 167.549 55.1851 166.444 55.1851V57.1851H168.444ZM166.444 59.1851C167.549 59.1851 168.444 58.2896 168.444 57.1851H166.444V59.1851ZM131.63 59.1851H166.444V57.1851H131.63V59.1851ZM129.63 57.1851C129.63 58.2896 130.525 59.1851 131.63 59.1851V57.1851H129.63ZM131.63 63.4075V61.4075C130.525 61.4075 129.63 62.3029 129.63 63.4075H131.63ZM131.63 63.4075H129.63C129.63 64.512 130.525 65.4075 131.63 65.4075V63.4075ZM166.444 63.4075H131.63V65.4075H166.444V63.4075ZM166.444 63.4075V65.4075C167.549 65.4075 168.444 64.512 168.444 63.4075H166.444ZM166.444 63.4075H168.444C168.444 62.3029 167.549 61.4075 166.444 61.4075V63.4075ZM131.63 63.4075H166.444V61.4075H131.63V63.4075ZM131.63 68.1486C130.525 68.1486 129.63 69.044 129.63 70.1486H131.63V68.1486ZM166.444 68.1486H131.63V70.1486H166.444V68.1486ZM168.444 70.1486C168.444 69.044 167.549 68.1486 166.444 68.1486V70.1486H168.444ZM166.444 72.1486C167.549 72.1486 168.444 71.2531 168.444 70.1486H166.444V72.1486ZM131.63 72.1486H166.444V70.1486H131.63V72.1486ZM129.63 70.1486C129.63 71.2531 130.525 72.1486 131.63 72.1486V70.1486H129.63ZM131.63 76.8888V74.8888C130.525 74.8888 129.63 75.7842 129.63 76.8888H131.63ZM131.63 76.8888H129.63C129.63 77.9934 130.525 78.8888 131.63 78.8888V76.8888ZM166.444 76.8888H131.63V78.8888H166.444V76.8888ZM166.444 76.8888V78.8888C167.549 78.8888 168.444 77.9934 168.444 76.8888H166.444ZM166.444 76.8888H168.444C168.444 75.7842 167.549 74.8888 166.444 74.8888V76.8888ZM131.63 76.8888H166.444V74.8888H131.63V76.8888Z"
                                            fill="#F9DB7F"
                                            mask="url(#path-4-inside-1)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear"
                                                x1="266.711"
                                                y1="132.285"
                                                x2="223.311"
                                                y2="0.332813"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stop-color="#0D165A" stop-opacity="0" />
                                                <stop
                                                    offset="0.1026"
                                                    stop-color="#0D165A"
                                                    stop-opacity="0.52"
                                                />
                                                <stop
                                                    offset="0.2446"
                                                    stop-color="#0D165A"
                                                    stop-opacity="0.68"
                                                />
                                                <stop
                                                    offset="0.4447"
                                                    stop-color="#0D165A"
                                                    stop-opacity="0.84"
                                                />
                                                <stop offset="1" stop-color="#0D165A" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                <div className="studyName">
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
export default StudyMaterialSubject;
