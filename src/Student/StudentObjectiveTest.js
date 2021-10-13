import { Component } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Config from '../config.json';
import Question from './objectivequestion';
import Studentnav from './studentnav';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// pathname: "/student/objectivetest",
// state: { exam_type: 1 },
class StudentObjectiveTest extends Component {
    constructor() {
        super();
        let data = localStorage.getItem("userdetail");
        data = JSON.parse(data);
        let student = data.username;
        this.state = {
            token: data.token,
            student: student,
            examid: '',
            exam_details: '',
            selectedquestion: '',
            markedquestionindex: '',
            answeredquestions: 0,
            unansweredquestions: 0,
            visitedunansweredarray: [],
            reviewarray: [],
            reviewanswered: 0,
            reviewunanswered: 0,
            report_message: '',
            selectedindex: 0,
            minutes: 0,
            seconds: 0,
            questions: [],
            time_over: '',
            isloading: false,
        }
    }
    Logout = () => {
        localStorage.clear();
        this.props.location.history.push('/');
    }
    onReloaded = () => {
        console.log(this.state);
        var examid = this.props.location.state.examdetails.id;
        var formdata = new FormData();
        formdata.append("exam", examid);
        formdata.append("student", this.state.student);
        var requestOptions = {
            method: 'POST',

            body: formdata,
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.token,
            },
        };
        fetch(Config.SERVER_URL + 'student/start-objective-exam/', requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json, 'json data');
                var remaining_time = json.remaining_time
                let actual_time = remaining_time;
                var minutes = Math.floor(remaining_time / 60);
                var seconds = remaining_time - minutes * 60;
                this.setState({
                    minutes: minutes,
                    seconds: seconds,
                });
                this.countDown();
                console.log('Timmer')
            })
            .catch(error => {
                this.props.history.push('/error')
                console.log('error', error);
            })
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    componentDidMount = () => {
        if (typeof (this.props.location.state) === 'undefined') {
            this.props.history.push('/');
        }
        else {
            var remaining_time = this.props.location.state.questions.remaining_time
            console.log(this.props);
            console.log(this.props.location.state.questions.remaining_time)
            // let time_over = this.props.location.state.qustions.time_over;
            // console.log(time_over)
            // let time_over_hours = Number(time_over.split(':')[0]);// hour
            // let time_over_minutes = Number(time_over.split(':')[1]);//minutes 
            // let time_over_seconds = Math.floor(Number(time_over.split(':')[2]));//second
            // let total_time = this.props.location.state.examdetails.exam_duration; //exam duration
            // let latest_seconds = this.convertToSeconds(time_over_hours, time_over_minutes, time_over_seconds);
            // let c_seconds = this.convertToSeconds(0, total_time, 0);
            // console.log(latest_seconds);
            // console.log(c_seconds);
            let actual_time = remaining_time;
            var minutes = Math.floor(remaining_time / 60);
            var seconds = remaining_time - minutes * 60;
            var unansweredquestions = 0;
            var answeredquestions = 0;
            var visitedunanswered = 0;
            var visitedunansweredarray = [];
            var reviewarray = [];
            var reviewanswered = 0;
            var reviewunanswered = 0;
            console.log(this.props.location.state.questions.data)
            {
                this.props.location.state.questions.data.map((item, index) => {
                    if (item.ans_given == 0) {
                        unansweredquestions = unansweredquestions + 1; // sum of questions array total unansquestion 
                    }
                    else if (item.ans_given != 0) {
                        answeredquestions = answeredquestions + 1;
                    }
                    if (item.start_time != null) {
                        visitedunansweredarray.push(index); //start time null hai toh visited mai push kar dete hai
                    }
                    if (item.review_status == "Yes") {
                        reviewarray.push(index);
                        if (item.ans_given == 0) {
                            reviewunanswered = reviewunanswered + 1; // if review status yes hai ori ans given 0 hai toh unans ho jayega
                        }
                        else if (item.ans_given != 0) {
                            reviewanswered = reviewanswered + 1; // agr ans de diya hai toh 
                        }
                    }
                })
            }
            if (!visitedunansweredarray.includes(0)) { // agr  visitedunansweredarray main 0 index nhi milta toh  visitedunansweredarray mai 0 index push kr dega
                visitedunansweredarray.push(0);
            }
            console.log(reviewarray);
            console.log(this.props.location.state.examdetails)
            this.setState({
                unansweredquestions: unansweredquestions,
                answeredquestions: answeredquestions,
                visitedunansweredarray: visitedunansweredarray,
                reviewarray: reviewarray,
                reviewanswered: reviewanswered,
                reviewunanswered: reviewunanswered, // helo
                exam_details: this.props.location.state.examdetails, //exam details
                examid: this.props.location.state.examdetails.id, // exam id
                selectedquestion: this.props.location.state.questions.data[0], // slected question mai phla index ka question dal diya
                questions: this.props.location.state.questions.data, // question mai sare questions ka data daal diya 
                time_over: this.props.location.state.questions.time_over, // time over 
                minutes: minutes, // line number 108
                seconds: seconds, // line number 109
            });
            this.timer = setInterval(this.countDown, 1000);
            window.addEventListener("beforeunload", this.onReloaded()) // on reload pe this function
            if (this.props.location.state.questions.data[0].ans_given == 0) {
                var formdata = new FormData();
                formdata.append("start_time", true);
                var requestOptions = {
                    method: 'PUT',
                    redirect: 'follow',
                    body: formdata,
                    headers: {
                        'Authorization': 'Token ' + this.state.token
                    },
                };
                // api mai ans given or question id bheji toh start time update karvaya
                fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.props.location.state.questions.data[0].id + "/" + this.props.location.state.questions.data[0].ans_given + "/", requestOptions)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json)
                        if (json.Error) {
                            alert('EXAM TIME OVER')
                            this.props.history.push({
                                pathname: '/student/objectivetest',
                                state: { exam_type: 1 },
                            })
                        }
                    }).catch((err) => {
                        this.props.history.push('/error')
                    })
            }
        }
    }

    convertToSeconds = (hours, minutes, seconds) => {
        return seconds + minutes * 60 + hours * 60 * 60;
    }
    countDown = () => {
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;
        let actual_time = this.convertToSeconds(0, minutes, seconds);
        // if (actual_time === 2) {
        //     this.setState({ seconds: 0 })
        //     clearInterval(this.timer)
        // }
        // if (actual_time === 2) {
        //     clearInterval(this.timer)
        //     var formdata = new FormData();
        //     formdata.append("exam", this.state.examid);
        //     formdata.append("student", this.state.student);
        //     var requestOptions = {
        //         method: 'POST',
        //         body: formdata,
        //         redirect: 'follow',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': 'Token ' + this.state.token,
        //         },
        //     };
        //     fetch(Config.SERVER_URL + 'student/submit-objective-exam/', requestOptions)
        //         .then(response => response.json())
        //         .then(json => {
        //             console.log(json);
        //             this.props.history.push({
        //                 pathname: '/student/objectiveexamcomplete',
        //                 state: { exam_complete: json },
        //             })
        //         })
        //         .catch(error => {
        //             console.log('error', error);
        //         })
        // }
        if (actual_time === 125) {
            toast.error("Less than 2 minutes left", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if (actual_time > 0) {

            // seconds change
            seconds ? this.setState({ seconds: seconds - 1 }) : this.setState({ seconds: 59 });

            // minutes change
            if (actual_time % 60 === 0 && minutes) {
                this.setState({ minutes: minutes - 1 });
            }
        }
        // else if (actual_time <= 0) {
        //   if (this.state.exam_details.timer_status == 1) {
        //     var formdata = new FormData();
        //     formdata.append("exam", this.state.examid);
        //     formdata.append("student", this.state.student);
        //     var requestOptions = {
        //       method: 'POST',
        //       body: formdata,
        //       redirect: 'follow',
        //       headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Token ' + this.state.token,
        //       },
        //     };
        //     fetch(Config.SERVER_URL + 'student/submit-objective-exam/', requestOptions)
        //       .then(response => response.json())
        //       .then(json => {
        //         console.log(json);
        //         this.props.history.push({
        //           pathname: '/student/objectiveexamcomplete',
        //           state: { exam_complete: json },
        //         })
        //       })
        //       .catch(error => {
        //         console.log('error', error);
        //       })
        //   }

        // }
    }
    reportquestiontext = (event) => {
        var variable = event.target.value;
        this.setState({
            report_message: variable,
        });
    }
    reportquestion = (e) => {
        e.preventDefault();
        var index = this.state.selectedindex;
        var formdata = new FormData();
        formdata.append("is_reported", "Yes");
        formdata.append("report_message", this.state.report_message);
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            body: formdata,
            headers: {
                'Authorization': 'Token ' + this.state.token
            },
        };
        fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index].id + "/" + this.state.questions[index].ans_given + "/", requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                var a = document.getElementById('close1');
                a.click();
                alert('Question Has Been Reported');
            })
    }
    onreviewClick = () => {
        var index = this.state.selectedindex;
        // index++
        var reviewarray = this.state.reviewarray;
        var reviewunanswered = this.state.reviewunanswered;
        var reviewanswered = this.state.reviewanswered;
        if (!reviewarray.includes(index)) {
            if (this.state.questions[index].ans_given == 0) {
                reviewunanswered = reviewunanswered + 1;
            }
            else if (this.state.questions[index].ans_given != 0) {
                reviewanswered = reviewanswered + 1;
            }
            reviewarray.push(index);
            console.log(reviewarray);
            var formdata = new FormData();
            formdata.append("review_status", "Yes");
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index].id + "/" + this.state.questions[index].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    if (json.Error) {
                        alert('EXAM TIME OVER')
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                    console.log(json);
                }).catch((err) => {
                    this.props.history.push('/error')
                })
        }
        if (this.state.selectedindex < this.state.questions.length - 1) {
            console.log('hello')
            index++;
            this.setState({
                selectedindex: index,
            });
        }
        var visitedunansweredarray = this.state.visitedunansweredarray;
        if (!visitedunansweredarray.includes(index)) {
            visitedunansweredarray.push(index);
        }
        this.setState({
            selectedquestion: this.state.questions[index],
            reviewarray: reviewarray,
            reviewanswered: reviewanswered,
            reviewunanswered: reviewunanswered,
        });
        // index++
        // this.setState({
        //     selectedindex: index,
        // });
    }
    onpreviousClick = () => {
        var index = this.state.selectedindex;
        index--;
        var visitedunansweredarray = this.state.visitedunansweredarray;
        if (!visitedunansweredarray.includes(index)) {
            visitedunansweredarray.push(index);
        }
        this.setState({
            selectedindex: index,
            selectedquestion: this.state.questions[index],
            visitedunansweredarray: visitedunansweredarray,
        });
        if (this.state.questions[index] != "" && this.state.questions[index].ans_given == 0) {
            var formdata = new FormData();
            formdata.append("start_time", true);
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index].id + "/" + this.state.questions[index].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    if (json.Error) {
                        alert('EXAM TIME OVER')
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                }).catch((err) => {
                    this.props.history.push('/error')
                })
        }
    }
    // start
    onnextClick = () => {
        var reviewarray = this.state.reviewarray;
        console.log(this.state.reviewarray, 'Review Array')
        var reviewunanswered = this.state.reviewunanswered;
        console.log(this.state.reviewunanswered, 'Revire un')
        var reviewanswered = this.state.reviewanswered;
        console.log(this.state.reviewanswered, 'review answered')
        var index = this.state.selectedindex; // first time selected index 0
        console.log(this.state.questions[index])
        console.log(index) // question number aata hai ismai
        if (reviewarray.includes(index)) {
            if (this.state.questions[index].ans_given == 0) {
                reviewunanswered = reviewunanswered - 1;
            }
            else if (this.state.questions[index].ans_given != 0) {
                reviewanswered = reviewanswered - 1;
            }
        }
        var remove = reviewarray.indexOf(index);
        console.log(remove)
        if (remove > -1) {
            reviewarray.splice(remove, 1); // condition for review
        }
        // console.log(reviewarray);
        var a = index++;
        console.log(a)
        var visitedunansweredarray = this.state.visitedunansweredarray;
        if (!visitedunansweredarray.includes(index)) {
            visitedunansweredarray.push(index);
        }
        this.setState({
            reviewarray: reviewarray,
            reviewanswered: reviewanswered,
            reviewunanswered: reviewunanswered,
            selectedindex: index,
            selectedquestion: this.state.questions[index],
            visitedunansweredarray: visitedunansweredarray,
        });
        if (this.state.questions[index] != "" && this.state.questions[index].ans_given == 0) {
            var formdata = new FormData();
            formdata.append("start_time", true);
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index].id + "/" + this.state.questions[index].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    console.log(json.data)
                    if (json.Error) {
                        alert('EXAM TIME OVER')
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                }).catch((err) => {
                    this.props.history.push('/error')
                })
        }
        if (this.state.questions[index] != "") {
            var formdata = new FormData();
            formdata.append("review_status", "No");
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            console.log(this.state.questions[index - 1]) // same question ki id bhej rha hai 
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index - 1].id + "/" + this.state.questions[index - 1].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    if (json.Error) {
                        alert('EXAM TIME OVER')
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                }).catch((err) => {
                    this.props.history.push('/error')
                })
        }
    }
    //end
    onQuestionClick = (item) => {
        document.getElementsByClassName('close')[0].click();
        var visitedunansweredarray = this.state.visitedunansweredarray;
        if (!visitedunansweredarray.includes(item)) {
            visitedunansweredarray.push(item);
        }
        this.setState({
            selectedindex: item,
            selectedquestion: this.state.questions[item],
            visitedunansweredarray: visitedunansweredarray,
        });
        if (this.state.questions[item] != "" && this.state.questions[item].ans_given == 0) {
            var formdata = new FormData();
            formdata.append("start_time", true);
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[item].id + "/" + this.state.questions[item].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    if (json.Error) {
                        alert('EXAM TIME OVER')
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                }).catch((err) => {
                    this.props.history.push('/error')
                })
        }
    }
    onHandleOption = (event) => {
        console.log(event)
        console.log(this.state.selectedquestion)
        console.log(this.state.selectedquestion.id)
        console.log(event.currentTarget.value)
        console.log('option click')
        var index = this.state.selectedindex;
        var reviewanswered = this.state.reviewanswered;
        var reviewunanswered = this.state.reviewunanswered;
        var answeredquestions = this.state.answeredquestions;
        var unansweredquestions = this.state.unansweredquestions;
        if (this.state.selectedquestion.ans_given == 0 && event.currentTarget.value != 0) {
            if (this.state.reviewarray.includes(index)) {
                reviewanswered = reviewanswered + 1; // ab uske option select karne ke baad review array mai koi index milta hai toh review answered mai chla jayega vo
                reviewunanswered = reviewunanswered - 1; // or review unanswered mai -1 kar rhe hai 
            }
            answeredquestions = answeredquestions + 1; // ans ko increase kr diya 
            unansweredquestions = unansweredquestions - 1; // un ans ko decrease kr diya 
        }
        var options = this.state.selectedquestion; // ke konsa option select kiya hai 
        options.ans_given = event.currentTarget.value;
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                'Authorization': 'Token ' + this.state.token
            },
        };
        // question ke bhar vali id id bhej rhe hai or option number
        fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.selectedquestion.id + "/" + event.currentTarget.value + "/", requestOptions)
            .then(response => response.json())
            .then(json => {
                if (json.Error) {
                    alert('EXAM TIME OVER')
                    this.props.history.push({
                        pathname: '/student/objectivetest',
                        state: { exam_type: 1 },
                    })
                }
            }).catch((err) => {
                this.props.history.push('/error')
            })
        this.setState({
            selectedquestion: options,
            answeredquestions: answeredquestions,
            unansweredquestions: unansweredquestions,
            reviewanswered: reviewanswered,
            reviewunanswered: reviewunanswered,
        });
    }
    onHandleClear = () => {
        var index = this.state.selectedindex;
        var reviewarray = this.state.reviewarray;
        var answeredquestions = this.state.answeredquestions;
        var unansweredquestions = this.state.unansweredquestions;
        if (!reviewarray.includes(index)) {
            if (this.state.questions[index].ans_given != 0) {
                answeredquestions = answeredquestions - 1;
                unansweredquestions = unansweredquestions + 1;
            }
            reviewarray.push(index);
            console.log(reviewarray);
            var formdata = new FormData();
            formdata.append("review_status", "Yes");
            var requestOptions = {
                method: 'PUT',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Token ' + this.state.token
                },
            };
            fetch(Config.SERVER_URL + "student/update-objective-exam-test-question/" + this.state.questions[index].id + "/" + this.state.questions[index].ans_given + "/", requestOptions)
                .then(response => response.json())
                .then(json => {
                    if (json.Error) {
                        alert(json.Error)
                        this.props.history.push({
                            pathname: '/student/objectivetest',
                            state: { exam_type: 1 },
                        })
                    }
                    console.log(json);
                })

            this.setState({
                reviewarry: reviewarray,
                answeredquestions: answeredquestions,
                unansweredquestions: unansweredquestions,
            });

        }
    }
    submitExam = () => {
        var formdata = new FormData();
        formdata.append("exam", this.state.examid);
        formdata.append("student", this.state.student);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + this.state.token,
            },
        };
        fetch(Config.SERVER_URL + 'student/submit-objective-exam/', requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                var a = document.getElementById('close2');
                a.click();
                this.props.history.push({
                    pathname: '/student/objectivetest',
                    state: { exam_type: 1 },
                })
            })
            .catch(error => {
                this.props.history.push('/error')
                console.log('error', error);
            })
    }
    render() {
        var box2 = {
            border: '1px solid black',
            backgroundColor: 'white',
            padding: '15px',
            minHeight: '80px',
        }
        var timer = {
            color: '#09AEE5',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '40px',
            letterSpacing: '0.05em',
            lineHeight: '100.2%',
            textTransform: 'uppercase',
        }
        var timersub = {
            color: '#09AEE5',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '20px',
            letterSpacing: '0.05em',
            lineHeight: '100.2%',
            textTransform: 'uppercase',

        }
        var box5 = {
            border: '1px solid black',
            backgroundColor: 'white',
            padding: '15px',
            overflow: 'auto',
            minHeight: '300px',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'

        }

        var timer;
        timer = 0;
        if (this.state.exam_details.timer_status == 1) {
            if (this.state.seconds < 10) {
                timer = (<div><div className="timer" style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', float: 'right' }}><svg style={{ marginRight: '5px', marginBottom: '-1.5px' }} width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2025 6V5.5H11.7025H13H13.5V6V12.2333V12.4523L13.339 12.6008L9.25644 16.3675L8.91739 16.6803L8.57834 16.3675L7.66095 15.5211L7.26264 15.1536L7.66095 14.7861L11.2025 11.5187V6Z" fill="#EA7A26" stroke="#EB7926" />
                    <path d="M11 0.5C16.79 0.5 21.5 5.20996 21.5 11C21.5 16.79 16.79 21.5 11 21.5C5.20996 21.5 0.5 16.79 0.5 11C0.5 5.20996 5.20996 0.5 11 0.5ZM11 19.25C15.5487 19.25 19.25 15.5487 19.25 11C19.25 6.45131 15.5487 2.75001 11 2.75001C6.45131 2.75001 2.75 6.45131 2.75 11C2.75 15.5487 6.45131 19.25 11 19.25Z" fill="#EA7A26" stroke="#EB7926" />
                </svg><span id="time">{this.state.minutes}:0{this.state.seconds}</span></div></div>);
            }
            else {
                timer = (<div><div className="timer" style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', float: 'right' }}><svg style={{ marginRight: '5px', marginBottom: '-1.5px' }} width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2025 6V5.5H11.7025H13H13.5V6V12.2333V12.4523L13.339 12.6008L9.25644 16.3675L8.91739 16.6803L8.57834 16.3675L7.66095 15.5211L7.26264 15.1536L7.66095 14.7861L11.2025 11.5187V6Z" fill="#EA7A26" stroke="#EB7926" />
                    <path d="M11 0.5C16.79 0.5 21.5 5.20996 21.5 11C21.5 16.79 16.79 21.5 11 21.5C5.20996 21.5 0.5 16.79 0.5 11C0.5 5.20996 5.20996 0.5 11 0.5ZM11 19.25C15.5487 19.25 19.25 15.5487 19.25 11C19.25 6.45131 15.5487 2.75001 11 2.75001C6.45131 2.75001 2.75 6.45131 2.75 11C2.75 15.5487 6.45131 19.25 11 19.25Z" fill="#EA7A26" stroke="#EB7926" />
                </svg><span id="time">{this.state.minutes} : {this.state.seconds}</span></div></div>);
            }
        }
        else if (this.state.exam_details.timer_status == 3) {
            timer = (<div></div>);
        }
        return (
            <div >
                <ToastContainer />
                <Studentnav />
                <div class="container">
                    <div class="row" style={{ marginTop: '20px' }}>
                        <div class="col-sm-4">
                            <button style={{ padding: '0px', border: 'none', background: 'none', margin: '0px' }} data-toggle="modal" data-target="#questionpaper">
                                <p style={{ fontSize: '15px', fontFamily: 'Montserrat' }}> <svg style={{ marginRight: '10px', marginBottom: '-3px' }} width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3333 2.12537H13.7843V15.6132C13.7843 16.5093 13.0549 17.2386 12.1589 17.2386H6.59625H2.17285V17.7386C2.17285 18.3112 2.63754 18.7758 3.21008 18.7758H8.7707H14.3313C14.9039 18.7758 15.3685 18.3112 15.3685 17.7386V3.16259C15.3686 2.59006 14.9058 2.12537 14.3333 2.12537Z" fill="#EB7926" />
                                    <path d="M6.59589 16.6505H12.1565C12.729 16.6505 13.1937 16.1858 13.1937 15.6133V2.12543V1.03722C13.1937 0.464692 12.729 0 12.1565 0H6.59589H4.74692V0.343127C4.75083 0.37842 4.75281 0.415674 4.75281 0.452928V2.71364V3.29402C4.75281 4.09988 4.09792 4.75476 3.29206 4.75476H2.71169H0.450968C0.421557 4.75476 0.390185 4.7528 0.360774 4.75084H0V15.6133C0 16.1858 0.464693 16.6505 1.03723 16.6505H2.17445H6.59589ZM6.80569 13.1251H3.1803C2.90972 13.1251 2.69012 12.9055 2.69012 12.6349C2.69012 12.3643 2.90972 12.1447 3.1803 12.1447H6.80765C7.07823 12.1447 7.29783 12.3643 7.29783 12.6349C7.29783 12.9055 7.07627 13.1251 6.80569 13.1251ZM10.433 10.6232H3.1803C2.90972 10.6232 2.69012 10.4036 2.69012 10.1331C2.69012 9.86245 2.90972 9.64287 3.1803 9.64287H10.433C10.7036 9.64287 10.9232 9.86245 10.9232 10.1331C10.9232 10.4036 10.7036 10.6232 10.433 10.6232ZM3.1803 6.98607H10.433C10.7036 6.98607 10.9232 7.20567 10.9232 7.47625C10.9232 7.74683 10.7036 7.96643 10.433 7.96643H3.1803C2.90972 7.96643 2.69012 7.74683 2.69012 7.47625C2.69012 7.20567 2.90972 6.98607 3.1803 6.98607Z" fill="#EB7926" />
                                    <path d="M0.450997 4.16667H3.29209C3.29405 4.16667 3.29797 4.16667 3.29994 4.16667C3.77443 4.16274 4.15873 3.77844 4.16266 3.30395C4.16266 3.30199 4.16266 3.29806 4.16266 3.2961V0.45305C4.16266 0.190313 3.94698 0.0158081 3.72347 0.0158081C3.61563 0.0158081 3.50779 0.0550226 3.4176 0.145216L0.141202 3.42159C-0.1333 3.69609 0.060812 4.16667 0.450997 4.16667Z" fill="#EB7926" />
                                </svg>
                                    View question paper </p>
                            </button>
                            <div id="questionpaper" className="modal fade" role="dialog">
                                <div class="modal-dialog" id="modalDialog" style={{ width: '90%' }}>
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Question Paper: </h4>
                                        </div>
                                        <div class="modal-body">
                                            {this.state.questions.map((item, index) => (<div onClick={() => { this.onQuestionClick(index) }} style={{ borderBottom: '1px solid lightgrey', padding: '10px', cursor: 'pointer' }}><p style={{ fontSize: '15px', fontFamily: 'Montserrat', fontWeight: 'bold' }}>Question {index + 1}:</p><div>{parse(item.question_assoc.question_text)}</div></div>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <button style={{ padding: '0px', border: 'none', background: 'none', margin: '0px' }} data-toggle="modal" data-target="#instructions">
                                <p style={{ fontSize: '15px', fontFamily: 'Montserrat' }}> <svg style={{ marginRight: '10px', marginBottom: '-3px' }} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 0C13.1983 0 17 3.80199 17 8.5C17 13.1983 13.198 17 8.5 17C3.80166 17 0 13.198 0 8.5C0 3.80166 3.80199 0 8.5 0ZM8.5 15.6719C12.4642 15.6719 15.6719 12.464 15.6719 8.5C15.6719 4.53578 12.464 1.32812 8.5 1.32812C4.53578 1.32812 1.32812 4.53605 1.32812 8.5C1.32812 12.4642 4.53605 15.6719 8.5 15.6719Z" fill="black" />
                                    <path d="M8.5 4.27911C8.86676 4.27911 9.16406 4.57641 9.16406 4.94318V9.2195C9.16406 9.58626 8.86676 9.88356 8.5 9.88356C8.13324 9.88356 7.83594 9.58626 7.83594 9.2195V4.94318C7.83594 4.57641 8.13324 4.27911 8.5 4.27911Z" fill="black" />
                                    <path d="M8.5 12.4897C8.00489 12.4897 7.60352 12.0883 7.60352 11.5932C7.60352 11.0981 8.00489 10.6967 8.5 10.6967C8.99511 10.6967 9.39648 11.0981 9.39648 11.5932C9.39648 12.0883 8.99511 12.4897 8.5 12.4897Z" fill="black" />
                                </svg>
                                    Instructions</p>
                            </button>
                            <div id="instructions" className="modal fade" role="dialog">
                                <div class="modal-dialog" id="modalDialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Instructions: </h4>
                                        </div>
                                        <div class="modal-body">
                                            {parse(this.props.location.state.examdetails.exam_instructions)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="submitexam" className="modal fade" role="dialog">
                            <div class="modal-dialog" id="modalDialog">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <center>
                                            <p style={{ fontFamily: 'Montserrat', fontSize: '17px', color: '#464646' }}>Are you sure you want to submit the exam? You cannot return to the exam once submitted.</p><br />
                                            <button onClick={this.submitExam} style={{ background: '#EA7A26', marginRight: '20px', border: 'none', borderRadius: '34px', width: '100px' }} class="btn btn-primary">Yes</button>
                                            <button id="close2" style={{ background: '#EA7A26', marginRight: '20px', border: 'none', borderRadius: '34px', width: '100px' }} type="button" class="close" data-dismiss="modal" class="btn btn-primary">No</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <button className="btn" style={{ float: 'right', color: '#1C3687', border: '2px solid #1C3687', borderRadius: '10px', background: 'white', width: '100px' }} data-toggle="modal" data-target="#submitexam">Submit</button>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "30px" }}>

                        <div className="col-md-9" style={{ marginBottom: '20px' }}>
                            <div class="box" style={{ border: '1px solid #BEC5D3', borderRadius: '10px', padding: '15px' }}>
                                <div class="row" style={{ borderBottom: '1px solid #BEC5D3' }}>
                                    <div class="col-xs-6">
                                        <p style={{ fontFamily: 'Montserrat', fontSize: '15px', color: '#1C3687', fontWeight: 'bold' }}>{this.state.exam_details.exam_topic}</p>
                                    </div>
                                    <div class="col-xs-6">
                                        {timer}
                                    </div>
                                </div>
                                {/* gelo */}
                                <div></div>
                                {this.state.selectedquestion == "" ? (<div></div>) : (<div><Question testing={this.state.selectedquestion} index={this.state.selectedindex} onChange={this.onHandleOption.bind()} /></div>)}
                            </div>
                            <div id="gap" style={{ marginTop: '20px' }}>
                                {this.state.selectedindex == 0 ? (<div><center><button className="btn" style={{ background: '#D9E2FF', border: 'none', borderRadius: '29px', color: '#383E88', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} data-toggle="modal" data-target="#reportquestion">REPORT QUESTION</button><button className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '29px', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} onClick={this.onreviewClick}>HOLD FOR REVIEW</button><button className="btn" style={{ background: 'white', border: '1px solid #383E88', borderRadius: '29px', color: '#1C3687', fontWeight: 'bold', fontFamily: 'Montserrat' }} id="next" onClick={this.onnextClick}>SAVE & NEXT</button></center></div>) : this.state.selectedindex < this.state.questions.length - 1 ? (<div> <center><button className="btn" style={{ background: '#D9E2FF', border: 'none', borderRadius: '29px', color: '#383E88', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} data-toggle="modal" data-target="#reportquestion">REPORT QUESTION</button><button className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '29px', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} onClick={this.onreviewClick}>HOLD FOR REVIEW</button><button className="btn" style={{ background: 'white', border: '1px solid #383E88', borderRadius: '29px', color: '#1C3687', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} id="prev" onClick={this.onpreviousClick}>PREVIOUS</button><button className="btn" style={{ background: 'white', border: '1px solid #383E88', borderRadius: '29px', color: '#1C3687', fontWeight: 'bold', fontFamily: 'Montserrat' }} id="next" onClick={this.onnextClick}>SAVE & NEXT</button></center></div>) : (<div><center> <button className="btn" style={{ background: '#D9E2FF', border: 'none', borderRadius: '29px', color: '#383E88', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} data-toggle="modal" data-target="#reportquestion">REPORT QUESTION</button><button className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '29px', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} onClick={this.onreviewClick}>HOLD FOR REVIEW</button><button className="btn" style={{ background: 'white', border: '1px solid #383E88', borderRadius: '29px', color: '#1C3687', fontWeight: 'bold', fontFamily: 'Montserrat', marginRight: '10px' }} id="prev" onClick={this.onpreviousClick}>PREVIOUS</button> <button className="btn" style={{ background: '#EB7926', border: 'none', borderRadius: '29px', color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat' }} id="submit" data-toggle="modal" data-target="#submitexam">SAVE & SUBMIT</button></center> </div>)}
                                <div id="reportquestion" className="modal fade" role="dialog">
                                    <div class="modal-dialog" id="modalDialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" id="close1" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title">Report Question: </h4>
                                            </div>
                                            <div class="modal-body">
                                                <form onSubmit={this.reportquestion}>
                                                    <label style={{ color: '#1C3687' }}>Report Message :</label>
                                                    <br />
                                                    <br />
                                                    <textarea onChange={this.reportquestiontext} row='10' class="form-control" placeholder="Enter Reason For Report" required></textarea>
                                                    <br />
                                                    <button type="submit" class="btn btn-primary" style={{ background: '#EB7926', border: 'none', borderRadius: '47px', width: '100px' }}>Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="box" style={{ border: '1px solid #BEC5D3', borderRadius: '10px', padding: '15px' }}>
                                <div class="row" style={{ borderBottom: '1px solid #BEC5D3' }}>
                                    <div class="col-xs-12">
                                        <center><p style={{ fontSize: '17px', fontWeight: 'bold', fontFamily: 'Montserrat' }}>Questions</p></center>
                                    </div>
                                </div>
                                <div class="row" style={{ borderBottom: '1px solid #BEC5D3', marginTop: '20px' }}>
                                    <div class="col-xs-12">
                                        <span class="dot" style={{ background: '#EB7926', height: '20px', width: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '-4px', marginRight: '4px' }}></span><p style={{ display: 'inline-block', fontSize: '12px', fontFamily: 'Montserrat' }}>Answered : </p> <span style={{ float: 'right', fontSize: '17px', fontFamily: 'Montserrat' }}>{this.state.answeredquestions}</span><br />
                                        <span class="dot" style={{ background: '#B1B1B1', height: '20px', width: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '-4px', marginRight: '4px', marginTop: '5px' }}></span><p style={{ display: 'inline-block', fontSize: '12px', fontFamily: 'Montserrat' }}>Unanswered : </p><span style={{ float: 'right', fontSize: '17px', fontFamily: 'Montserrat', marginTop: '6px' }}>{this.state.unansweredquestions}</span><br />
                                        <span class="dot" style={{ background: '#FFC107', height: '20px', width: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '-4px', marginRight: '4px', marginTop: '5px' }}></span><p style={{ display: 'inline-block', fontSize: '12px', fontFamily: 'Montserrat' }}>For Review : </p><span style={{ float: 'right', fontSize: '17px', fontFamily: 'Montserrat', marginTop: '6px' }}>{this.state.reviewunanswered}</span><br />
                                        <span class="dot" style={{ background: '#9C27B0', height: '20px', width: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '-4px', marginRight: '4px', marginTop: '5px' }}></span><p style={{ display: 'inline-block', fontSize: '12px', fontFamily: 'Montserrat' }}>Answered For Review : </p><span style={{ float: 'right', fontSize: '17px', fontFamily: 'Montserrat', marginTop: '6px' }}>{this.state.reviewanswered}</span><br />
                                        <span class="dot" style={{ background: '#1C74D9', height: '20px', width: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '-4px', marginRight: '4px', marginTop: '5px' }}></span><p style={{ display: 'inline-block', fontSize: '12px', fontFamily: 'Montserrat' }}>Visited Unanswered : </p><span style={{ float: 'right', fontSize: '17px', fontFamily: 'Montserrat', marginTop: '6px' }}>{this.state.visitedunansweredarray.length - this.state.answeredquestions}</span><br />

                                    </div>
                                </div>
                                <div class="row" style={{ marginTop: "20px", height: '120px', overflow: 'auto' }}>
                                    {this.state.questions.map((item, index) => {
                                        if (index == this.state.selectedindex) {
                                            if (this.state.reviewarray.includes(index)) {
                                                if (item.ans_given != '0') {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid grey', background: '#9C27B0', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                }
                                                else {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid grey', background: '#FFC107', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                }
                                            }
                                            else {
                                                if (item.ans_given != '0') {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid grey', background: '#EA7A26', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                }
                                                else {
                                                    if (this.state.visitedunansweredarray.includes(index)) {
                                                        return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid grey', background: '#1C74D9', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                    }
                                                    else {
                                                        return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid grey', background: '#D6D6D6', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (this.state.reviewarray.includes(index)) {
                                                if (item.ans_given != '0') {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#9C27B0', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                }
                                                else {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#FFC107', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                }
                                            }
                                            else {
                                                if (item.ans_given != '0') {
                                                    return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#EA7A26', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                } else {
                                                    if (this.state.visitedunansweredarray.includes(index)) {
                                                        return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#1C74D9', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                    }
                                                    else {
                                                        return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#D6D6D6', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
                                                    }
                                                }
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

        );
    }
}
export default StudentObjectiveTest;

