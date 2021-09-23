import { Component } from 'react';
import { Link } from 'react-router-dom';
import Studentnav from './studentnav';
import axios from 'axios';
import Config from '../config.json';
import Styles from './studentdashboard.module.css';
import dateFormat from 'dateformat';
import Issue from './Issue';
import TestImage from './No Test.png'
import quizImage from './no quiz scheduled png 1.png'
import classImage from './no class scheduled png 2.png'
import Footer from './Footer'
class Student extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      sectionid: '',
      token: data.token,
      student: data.username,
      class_subject: [],
      class_name: [],
      faculty_name: [],
      class_date: [],
      class_day: [],
      class_time: [],
      class_month: [],
      class_year: [],
      student_subject: [],
      meeting_number: [],
      attendance: '',
      student_subjects: [],
      student_subjects_name: [],
      subject_attendance: [],
      student_details: '',
      upcoming_tests: [],
      upcoming_quiz: [],
      classid: '',
      school_id: ''
    }

  }
  Logout = () => {
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount = () => {
    var formdata = new FormData();
    formdata.append('page_name', 'student-dashboard');
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Authorization': 'Token ' + this.state.token
      },
    };
    fetch(Config.SERVER_URL + "users/post-analytics/", requestOptions)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        // this.props.history.push('/error');
      })
      .catch(error => {
        this.props.history.push(
          {
            pathname: '/error',
          }
        )
      });
    var requestOptions1 = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + 'student/get-student-attendance/', requestOptions1)
      .then(response => {
        // console.log(response.data)
        var ch = response.data;
        this.setState({
          attendance: ch,
        })
      })
      .catch(error => {
        console.log(error);
      });
    axios.get(Config.SERVER_URL + 'student/get-scheduled-objective-exams/?student=' + this.state.student + '&type=1', requestOptions1)
      .then(response => {
        let lang = response.data;
        // console.log(lang);
        this.setState({
          upcoming_tests: lang,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    axios.get(Config.SERVER_URL + 'student/get-scheduled-objective-exams/?student=' + this.state.student + '&type=3', requestOptions1)
      .then(response => {
        let lang = response.data;
        // console.log(lang);
        this.setState({
          upcoming_quiz: lang,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    let student_subjects = [];
    var subject_attendance = [];
    let subject_name = [];
    axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + this.state.student, requestOptions1)
      .then(response => {
        // console.log(response.data.student_data)
        // console.log(response.data.student_data.section_assoc.id);
        student_subjects = response.data.student_subjects;
        this.setState({
          student_details: response.data.student_data,
          sectionid: response.data.student_data.section_assoc.id,
          classid: response.data.student_data.section_assoc.class_assoc,
          school_id: response.data.student_data.school_assoc.id
        })
        student_subjects.map((item) => {
          if (item.subject_assoc.is_main_subject == true) {
            subject_name.push(item.subject_assoc.subject_name);
            axios.get(Config.SERVER_URL + 'student/get-student-attendance/?subject=' + item.subject_assoc.id, requestOptions1)
              .then(response => {
                // console.log(response.data)
                subject_attendance.push(response.data);
                this.setState({
                  subject_attendance: subject_attendance,
                });
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        this.setState({
          student_subjects_name: subject_name,
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(Config.SERVER_URL + 'student/student-dashboard/', requestOptions1)
      .then(response => {
        // console.log(response.data);
        // const user = response.data.username;
        // const stusub = response.data.section_subjects;
        const sub = [];
        const cls = [];
        const fac = [];
        const fulltime = [];
        const month = [];
        const date = [];
        const year = [];
        const day = [];
        const time = [];
        const meeting = [];
        const meeting_number = [];
        for (let i = 0; i < response.data.live_classes.length; i++) {
          sub.push(response.data.live_classes[i][1]);
          cls.push(response.data.live_classes[i][0]);
          fac.push(response.data.live_classes[i][2]);
          meeting.push(response.data.live_classes[i][3]);
          fulltime.push(response.data.live_classes[i][4]);
        }
        // console.log(stusub);
        // console.log(sub);
        // console.log(cls);
        // console.log(fac);
        // console.log(fulltime);
        // console.log(meeting);
        for (let i = 0; i < response.data.live_classes.length; i++) {
          var a = meeting[i].split('/');
          var b = a[a.length - 1];
          meeting_number.push(b.split('?', 1));
        }
        // console.log(meeting_number);
        for (let i = 0; i < response.data.live_classes.length; i++) {

          month.push(dateFormat(fulltime[i], "mmm"));
          date.push(dateFormat(fulltime[i], "dS"));
          year.push(dateFormat(fulltime[i], "yyyy"));
          day.push(dateFormat(fulltime[i], "DDDD"));
          time.push(dateFormat(fulltime[i], "hh:MM TT"));
        }
        this.setState({
          // name:user,
          class_subject: sub,
          class_name: cls,
          faculty_name: fac,
          class_date: date,
          class_month: month,
          class_day: day,
          class_year: year,
          class_time: time,
          // student_subject:stusub,
          meeting_number: meeting_number,
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  selected_subject = (item) => {
    // console.log(item);
    this.props.history.push(
      {
        pathname: '/student/assignment',
        state: { selected_subject_id: item },
      }
    )
  }

  onJoinmeeting = (item) => {
    this.props.history.push('/student/liveclass/upcomingliveclass');
  }
  onPastliveclass = () => {
    this.props.history.push('/student/liveclass/pastliveclass');
  }
  ViewAll = () => {
    this.props.history.push({
      pathname: '/student/objectivetest', state: { exam_type: 1 }
    })
  }
  startTest = (item) => {
    this.props.history.push({
      pathname: '/student/objectiveexaminstruction',
      state: { examdetails: item.exam_details },
    })
  }
  jeeadvance = () => {
    window.open(`https://class.zinedu.com/WEBStudent/JEEAdvancePageAccess?StudentReferenceId=${this.state.student_details.id}&ClassId=${this.state.classid}&SectionId=${this.state.sectionid}&SchoolId=${this.state.school_id}`)
  }
  jeeadvance2 = () => {
    window.open(`https://class.zinedu.com/WEBStudent/JEEAdvancePageAccess?StudentReferenceId=${this.state.student_details.id}&ClassId=${this.state.classid}&SectionId=${this.state.sectionid}&SchoolId=${this.state.school_id}`)
  }
  render() {
    if (this.state.class_subject.length > 0) {
      var items = [
        <div class="item active">  <div class="row"><div class="col-xs-8">
          <p style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '3vw', lineHeight: '113.6%', color: '#FFFFFF', }}>UPCOMING CLASSES</p>

          <p style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '21px', lineHeight: '210.6%', color: '#FFFFFF', marginTop: '20px', }}>SUBJECT : {this.state.class_subject[0]}<br />
            DETAILS OF CLASS : {this.state.class_name[0]}<br />
            FACULTY NAME : {this.state.faculty_name[0]}</p>
          <button onClick={() => { this.onJoinmeeting(this.state.meeting_number[0]) }} class="btn" style={{ background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>JOIN NOW</button>
          <button onClick={this.onPastliveclass} class="btn" style={{ background: '#FFFFFF', borderRadius: '47px', fontWeight: 'bold', color: '#383E88', outline: 'none', marginLeft: '25px', fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>PAST CLASSES</button>

        </div>
          <div class="col-xs-4">
            <div class={Styles.datebox}>
              <div id="month" style={{ background: '#EB7926', borderRadius: '10px 10px 0px 0px', padding: '1px' }}>
                <p style={{ marginTop: '10px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '17px', lineHeight: '150.6%', color: '#FFFFFF', }}>{this.state.class_month[0]} {this.state.class_year[0]}</p>
              </div>
              <div id="day" style={{ background: 'white', borderRadius: '0px 0px 10px 10px', padding: '10px' }}>
                <p style={{ marginTop: '0px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '25px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_date[0]}</p>
                <p style={{ marginTop: '5px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '17px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_time[0]}</p>
                <p style={{ marginTop: '5px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '20px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_day[0]}</p>
              </div>
            </div>
          </div>
        </div>
        </div>];
      // items = (<div class="item active">{this.state.subject[0]}</div>)
      for (let i = 1; i < this.state.class_subject.length; i++) {
        items.push(<div class="item"><div class="row"><div class="col-xs-8">

          <p style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '3vw', lineHeight: '113.6%', color: '#FFFFFF', }}>UPCOMING CLASSES</p>
          <p style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '21px', lineHeight: '210.6%', color: '#FFFFFF', marginTop: '20px', }}>SUBJECT : {this.state.class_subject[i]}<br />
            DETAILS OF CLASS : {this.state.class_name[i]}<br />
            FACULTY NAME : {this.state.faculty_name[i]}</p>
          <button onClick={() => { this.onJoinmeeting(this.state.meeting_number[i]) }} class="btn" style={{ background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>JOIN NOW</button>
          <button onClick={this.onPastliveclass} class="btn" style={{ background: '#FFFFFF', borderRadius: '47px', fontWeight: 'bold', color: '#383E88', outline: 'none', marginLeft: '25px', fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>PAST CLASSES</button>

        </div>
          <div class="col-xs-4">
            <div class={Styles.datebox}>
              <div id="month" style={{ background: '#EB7926', borderRadius: '10px 10px 0px 0px', padding: '1px' }}>
                <p style={{ marginTop: '10px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '17px', lineHeight: '150.6%', color: '#FFFFFF', }}>{this.state.class_month[i]} {this.state.class_year[i]}</p>
              </div>
              <div id="day" style={{ background: 'white', borderRadius: '0px 0px 10px 10px', padding: '10px' }}>
                <p style={{ marginTop: '0px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '25px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_date[i]}</p>
                <p style={{ marginTop: '5px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '17px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_time[i]}</p>
                <p style={{ marginTop: '5px', fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '20px', lineHeight: '113.6%', color: '#EB7926', }}>{this.state.class_day[i]}</p>
              </div>
            </div>
          </div>
        </div></div>);
      }
      // console.log(items);
    }
    else if (this.state.class_subject.length === 0) {
      var now = new Date();
      var items = [
        <div class="item active"><div class="row"><div class="col-xs-8">
          <p style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: 'bold', fontSize: '3vw', lineHeight: '113.6%', color: '#FFFFFF', }}>UPCOMING CLASSES</p>
          <img src={classImage} width='70%' /><br />
          <button onClick={this.onPastliveclass} class="btn" style={{ background: '#FFFFFF', borderRadius: '47px', fontWeight: 'bold', color: '#383E88', outline: 'none', marginLeft: '0px', fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>
            PAST CLASSES
          </button>
        </div>
        </div>
        </div>];
    }
    var assignment = [];

    if (this.state.student_subjects_name.length > 0) {
      assignment = this.state.student_subjects_name.map((item, index) => {
        if (index % 3 == 2 || index == 2) {
          return (<div><div class="col-xs-4" style={{ marginBottom: '10px' }}>
            <p style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '2.3vw',
              lineHeight: '113.6%',
              color: '#EB7926',
              marginTop: '20px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>{item}</p>
          </div></div>)
        }
        else {
          return (<div><div class="col-xs-4" style={{ borderRight: '2px solid #EB7926', marginBottom: '10px' }}>
            <p style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '2.3vw',
              lineHeight: '113.6%',
              color: '#EB7926',
              marginTop: '20px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>{item}</p>
          </div></div>)
        }
      });
      // for(let i=0;i<this.state.student_subjects_name.length;i++){
      //     if(i%3==2 || i==2){
      //       assignment.push(<div class="col-xs-4">
      //       <p style={{fontFamily:'Montserrat',
      //       fontStyle: 'normal',
      //       fontWeight: 'bold',
      //       fontSize: '2.3vw',
      //       lineHeight: '113.6%',
      //       color: '#EB7926',
      //       marginTop:'20px',
      //       marginBottom:'20px',
      //       textAlign:'center',}} onClick={() => this.selected_subject(this.state.student_subject[i][0])}>{this.state.student_subject[i][1]}</p>
      //       </div>);
      //     }
      //     else{
      //       assignment.push(<div class="col-xs-4"  style={{borderRight:'2px solid #EB7926'}}>
      //       <p style={{fontFamily:'Montserrat',
      //       fontStyle: 'normal',
      //       fontWeight: 'bold',
      //       fontSize: '2.3vw',
      //       lineHeight: '113.6%',
      //       color: '#EB7926',
      //       marginTop:'20px',
      //       marginBottom:'20px',
      //       textAlign:'center',}} onClick={() => this.selected_subject(this.state.student_subject[i][0])}>{this.state.student_subject[i][1]}</p>
      //       </div>);
      //     }
      // }
    }
    var box1 = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '175px',
      background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
      textAlign: 'center'
    }
    var box2 = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '175px',
      background: 'linear-gradient(90.18deg, #FEB683 2.43%, #FF8993 99.83%)',
      textAlign: 'center'
    }
    var box3 = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '175px',
      background: 'linear-gradient(261.9deg, #F1A32E -4.61%, #E6381A 96.31%)',
      textAlign: 'center'
    }
    var btn1 = {
      border: 'none',
      marginTop: '40px',
      width: '200px',
      padding: '10px',
      background: '#FFFFFF',
      borderRadius: '43px',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '17px',
      textAlign: 'center',
      textTransform: 'capitalize',

      color: '#0061B5',
    }
    var btn2 = {
      background: '#EA7A26',
      border: 'none',
      // marginTop: '10px',
      padding: '7px',
      borderRadius: '39px',
      fontWeight: 'bold',
      color: 'white',
      float: 'right',
      width: '100%',
    }
    var searchContainer = {
      display: 'inline-flex',
      flex: '1 1 300px',
      position: 'relative',
      borderRadius: '0px',
      overflow: 'hidden',
      width: '100%',
      outline: 'none',
    }
    var searchIcon = {
      padding: '0.5rem 0.5rem 0 0.5rem',
      color: 'lightgrey',
      fontSize: '18px'
    }

    var searchBox = {
      border: '0',
      borderBottom: '1px solid #ccc',
      padding: '0rem 0.5rem 0.5rem 1rem',
      flex: '1',
      boxShadow: 'none',
    }

    var searchButton = {
      background: '#EA7A26',
      border: '0',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '39px',
      margin: '0 0 0 30px',
      fontWeight: 'bold',
      fontSize: '16px',
      width: '150px'

    }
    var bigbox = {
      // padding:'20px',

    }
    var text1 = {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '3vw',
      lineHeight: '113.6%',
      color: '#FFFFFF',
      display: 'inline-block',
    }
    var text2 = {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '150.6%',
      color: '#FFFFFF',
      marginTop: '20px',
    }
    var text3 = {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '15px',
      lineHeight: '113.6%',
      color: '#EB7926',
      marginTop: '15px',
      textAlign: 'center',
    }
    var text4 = {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '15px',
      lineHeight: '113.6%',
      color: '#EB7926',
      marginTop: '5px',
      textAlign: 'center',
    }
    var icon = {
      color: '#EB7926',
      fontSize: '50px',
      marginTop: '10px'
    }
    return (
      <div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                This feature is not available currently
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <Issue />
        <Studentnav history={this.props.history} />
        <div class={Styles.studentdashboard}>
          <div style={{ borderBottom: '1px solid rgba(255, 141, 56, 0.5)' }}>
            <p style={{ margin: '0px 0px 10px 50px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#292E42', fontSize: '25px', textTransform: 'capitalize' }}>Hi {this.state.student_details.name}!</p>
          </div>

          <div class="container-fluid" id={Styles.contain}>
            {/* <div class="row" style={{ marginTop: '40px' }}>
              <div class="col-sm-8">
                <form>
                  <div style={searchContainer}>
                    <i class="fa fa-search" style={searchIcon}></i>
                    <input style={searchBox} class="form-control" type="text" name="search" placeholder="Search video, test series and notes" />
                    <input type="submit" value="Search" style={searchButton} />
                  </div>
                </form>
              </div>
              <div class="col-sm-4">
                <Link to='/student/feemodule/installmentpage'>
                  <button style={btn2}>PAY FEES</button>
                </Link>
              </div>
            </div> */}
            <div class="row" style={{ marginTop: '50px' }}>
              <div class="col-md-8">
                <div class={Styles.bigbox}>

                  <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                      {items}
                    </div>
                    <a id={Styles.leftarrow} class="left carousel-control" href="#myCarousel" data-slide="prev" style={{ background: 'none', width: '0px', opacity: '1' }}>
                      <span style={{ marginLeft: '-35px', marginTop: '5px', color: 'grey', background: 'white', borderRadius: '50%' }} class="glyphicon glyphicon-chevron-left"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a id={Styles.rightarrow} class="right carousel-control" href="#myCarousel" data-slide="next" style={{ background: 'none', width: '0px', opacity: '1' }}>
                      <span style={{ left: '105%', marginLeft: '5px', marginTop: '5px', color: 'grey', background: 'white', borderRadius: '50%' }} class="glyphicon glyphicon-chevron-right"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                </div>

                <br /><br />
                <Link to={{ pathname: '/student/assignmentssubjects', state: { exam_type: 2 } }}>
                  <div class={Styles.bigbox}>
                    <div class="row">
                      <div class="col-xs-12">
                        <p style={text1}>ASSIGNMENTS</p>
                        <button class="btn" style={{ background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', display: 'inline-block', float: 'right', marginTop: '2px' }}>VIEW ALL</button>
                        <div class="row" style={{ marginTop: '80px' }}>
                          {assignment}
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
                <br /><br />
                {this.state.upcoming_tests.length === 0 ?
                  <div class={Styles.bigbox}>
                    <div class="row">
                      <div class="col-xs-12">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <p style={text1}>TEST</p>
                          </div>
                          {(() => {
                            switch (this.state.sectionid) {
                              case 303:
                                return <button onClick={this.jeeadvance} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 393:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 390:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 371:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 370:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 369:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 359:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 358:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 357:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 327:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 319:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 318:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 317:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 316:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 315:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 308:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 306:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 305:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 301:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 241:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 240:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 239:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 238:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 237:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 224:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 223:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 222:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 221:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 211:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 209:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              case 202:
                                return <button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                              default:
                                return <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button>;
                            }
                          })()}
                          {/* {this.state.sectionid === 303 ? <button onClick={this.jeeadvance} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button> 
                          : <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button>} */}
                        </div>
                      </div>
                    </div>
                  </div> :
                  <div class={Styles.bigbox}>
                    <div class="row">
                      <div class="col-xs-12">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <p style={text1}>TEST</p>
                          </div>
                          <div>
                            {(() => {
                              switch (this.state.sectionid) {
                                case 303:
                                  return <button onClick={this.jeeadvance} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                case 393:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 390:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 371:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 370:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 369:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 359:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 358:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 357:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 327:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 319:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 318:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 317:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 316:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 315:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 308:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 306:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 305:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 301:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 241:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 240:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 239:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 238:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 237:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 224:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 223:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 222:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 221:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 211:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 209:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                case 202:
                                  return <div><button onClick={this.jeeadvance2} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '500px', marginTop: '2px', marginRight: '20px' }}>Click here for jee advanced test series</button>
                                    <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button></div>
                                default:
                                  return <button onClick={this.ViewAll} class="btn" style={{ outline: 'none', background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px', marginRight: '20px' }}>VIEW ALL</button>;
                              }
                            })()}
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div class="row">
                            {this.state.upcoming_tests.map((item, index) => {
                              if (index == 0) {
                                let data = item
                                return (
                                  <div style={{ marginLeft: '20px' }}>
                                    <div style={{ fontSize: '30px', color: '#fff' }}>{item.exam_assoc.exam_topic}</div><br />
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                      <div>
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M11.6816 21.1845V11.5166H10.5342C9.71254 11.9546 8.91839 12.4425 8.15625 12.9775V14.2372C8.83594 13.7714 9.91256 13.1134 10.4364 12.8289H10.4581V21.1845H11.6816ZM13.8348 18.8192C13.92 19.9792 14.9114 21.3676 16.9215 21.3676C19.2016 21.3676 20.5465 19.4354 20.5465 16.1639C20.5465 12.6585 19.1309 11.3281 17.0067 11.3281C15.3283 11.3281 13.7496 12.5461 13.7496 14.6069C13.7496 16.7094 15.2431 17.8151 16.7874 17.8151C18.1395 17.8151 19.0168 17.1336 19.2941 16.3832H19.343C19.3357 18.7684 18.5074 20.3054 16.9777 20.3054C15.7742 20.3054 15.1507 19.4898 15.0746 18.8192H13.8348ZM19.1871 14.6196C19.1871 15.8811 18.1739 16.7584 17.0411 16.7584C15.9518 16.7584 14.9676 16.0642 14.9676 14.5834C14.9676 13.0917 16.0225 12.3902 17.0846 12.3902C18.2319 12.3902 19.1871 13.1116 19.1871 14.6196Z" fill="#EB7926" />
                                          <path d="M6.34375 0C6.5841 0 6.81461 0.0954797 6.98457 0.265435C7.15452 0.435389 7.25 0.665898 7.25 0.90625V1.8125H21.75V0.90625C21.75 0.665898 21.8455 0.435389 22.0154 0.265435C22.1854 0.0954797 22.4159 0 22.6562 0C22.8966 0 23.1271 0.0954797 23.2971 0.265435C23.467 0.435389 23.5625 0.665898 23.5625 0.90625V1.8125H25.375C26.3364 1.8125 27.2584 2.19442 27.9383 2.87424C28.6181 3.55406 29 4.47609 29 5.4375V25.375C29 26.3364 28.6181 27.2584 27.9383 27.9383C27.2584 28.6181 26.3364 29 25.375 29H3.625C2.66359 29 1.74156 28.6181 1.06174 27.9383C0.381919 27.2584 0 26.3364 0 25.375V5.4375C0 4.47609 0.381919 3.55406 1.06174 2.87424C1.74156 2.19442 2.66359 1.8125 3.625 1.8125H5.4375V0.90625C5.4375 0.665898 5.53298 0.435389 5.70293 0.265435C5.87289 0.0954797 6.1034 0 6.34375 0V0ZM1.8125 7.25V25.375C1.8125 25.8557 2.00346 26.3167 2.34337 26.6566C2.68328 26.9965 3.14429 27.1875 3.625 27.1875H25.375C25.8557 27.1875 26.3167 26.9965 26.6566 26.6566C26.9965 26.3167 27.1875 25.8557 27.1875 25.375V7.25H1.8125Z" fill="#EB7926" />
                                        </svg>
                                      </div>
                                      <div style={{ fontSize: '20px', marginLeft: '10px', color: '#fff' }}>
                                        Date : {dateFormat(item.exam_assoc.exam_start_date, 'ddd dd/mm/yyyy')}
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '20px' }}>
                                      <div>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M13.75 0C6.16825 0 0 6.16825 0 13.75C0 21.3317 6.16825 27.5 13.75 27.5C21.3317 27.5 27.5 21.3317 27.5 13.75C27.5 6.16825 21.3317 0 13.75 0ZM13.75 24.75C7.68488 24.75 2.75 19.8151 2.75 13.75C2.75 7.68488 7.68488 2.75 13.75 2.75C19.8151 2.75 24.75 7.68488 24.75 13.75C24.75 19.8151 19.8151 24.75 13.75 24.75Z" fill="#EB7926" />
                                          <path d="M13.75 8H11V15.4443L15.5279 19.9721L17.4721 18.0279L13.75 14.3058V8Z" fill="#EB7926" />
                                        </svg>
                                      </div>
                                      <div style={{ fontSize: '20px', marginLeft: '10px', color: '#fff' }}>
                                        Time : {dateFormat(item.exam_assoc.exam_start_date, 'h:MM TT')}
                                      </div>
                                    </div>
                                    <div>
                                      <div></div>
                                      <div></div>
                                    </div><br />
                                  </div>
                                )
                              }
                            })}
                          </div>
                          <div style={{ marginRight: '20px' }}>
                            <svg width="196" height="196" viewBox="0 0 196 196" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M97.5586 0C43.7411 0 0 43.74 0 97.558C0 151.376 43.741 195.117 97.5586 195.117C151.376 195.117 195.117 151.376 195.117 97.558C195.117 43.7401 151.376 0 97.5586 0ZM97.5586 10.5469C145.676 10.5469 184.57 49.44 184.57 97.558C184.57 145.676 145.676 184.57 97.5586 184.57C49.4409 184.57 10.5469 145.676 10.5469 97.558C10.5469 49.44 49.4408 10.5469 97.5586 10.5469ZM96.6843 51.252C78.5934 51.3798 61.3417 63.2633 54.6743 80.075C47.7355 96.5072 51.5714 116.733 64.0487 129.481C76.1805 142.541 96.1698 147.354 112.913 141.233C130.459 135.256 143.349 117.9 143.813 99.3421C144.748 81.3127 133.912 63.4859 117.598 55.8293C111.372 52.815 104.462 51.2458 97.5465 51.255C97.2591 51.251 96.9717 51.25 96.6844 51.252H96.6843ZM98.3341 59.6867C114.862 59.7605 130.367 71.9759 134.221 88.0763C138.513 103.793 131.281 121.714 117.202 129.949C102.827 138.971 82.5588 136.567 70.7542 124.348C58.297 112.33 56.0786 91.5379 65.6358 77.1257C72.4046 66.3735 84.8364 59.5686 97.5465 59.6925C97.8093 59.6874 98.0718 59.6855 98.3341 59.6867ZM109.509 70.4521L96.8627 93.3944C92.957 93.8097 92.0291 99.7354 95.6327 101.316C98.0132 102.968 99.8775 100.22 102.044 100.314H121.376V95.041H101.977L114.127 72.9976L109.509 70.4521Z" fill="#EB7926" />
                            </svg>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                }
              </div>
              <div class="col-md-4">
                <div class="row">
                  <div class="col-sm-6">
                    <Link to='/student/doubtmodule/uploaddoubt' style={{ textDecoration: 'none' }}>
                      <div class={Styles.smallbox}>
                        <i style={icon} class="far fa-question-circle"></i>

                        <p style={text3}>ASK A DOUBT</p>
                      </div>
                    </Link>
                  </div>
                  <div class="col-sm-6">
                    <Link to='/student/notes/notessubjects' style={{ textDecoration: 'none' }}>
                      <div class={Styles.smallbox}>
                        <svg style={{ marginLeft: '17px', marginTop: '10px' }} width="55" height="55" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <rect width="55" height="55" fill="url(#pattern0)" />
                          <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                              <use xlinkHref="#image0" transform="scale(0.0151515 0.0153846)" />
                            </pattern>
                            <image id="image0" width="66" height="65" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABBCAYAAABlwHJGAAAFz0lEQVR4nO2cCYhVZRTHf/OcpqbFTEWKFixFs832zTa1MHAtisgWiDYqihYi1CyTVgQxqIgyKsMaklZbiHYK2rSJtmmVmlKZUitkpklrJg6cGx+H77733Xfve+++1/zhMu9993v3nO9/7/ed851z7jRtmDsWBwcBlwCHA9tRO/QCHwL3A19WQ4tm5/MC4CagqYYEuDgKuEJ1uq3Swgr692rg5hyREEH0uxW4r9K6iaDhKizPuAx4BBhUSSKmAjs4bd8Bh+q5pioetxjdtprv5wNtQEuliNjXtN0OtAP9lRCYAPOAj033M4Cnge2zFiZEtJq237IWUiZ+BSYB75mfyxP8ArBTlsIKAX1qiT+Ak4E3jQ4TgdeAnf8vRAh6gFOBlab9SOBdYJcshNQDEYItuj48btoPAJ7IQkC9EIGSIZZjqWmfAkxOe/HmgD6tqsBuaYUpxBp9rqt/Mcs0CxjpaV8HbFD/J8JM4PU0SoUQ8SQwLY2QGCzw+A4uZuoRgtFplQmZGiemFRJ43T9TXCu1XxFCxFNphcTgGdO8Ui1ETRAyNS5U1zarNULQAXxg2mS7PQ44HtimxO9lfViUoT5BRPQBr2QptAg6geUB/UZmTUQ9mc+KYoAIxQARigEiFANEKEKsRiNAImD7aAxD4hxr7ZhCnojTgC7dF9TikJjEdWXeDBnf5cAPGoKUyNvPuteZlZQIiSCPKFORLDBYfYakcQcJ9D4G3AvsZc7tr57tvKghhIjuqgy3OGQL/nfC3wh5s0v0kej9KQSuEefqRfcsYwBZYJMmeDYnuNalwDWmrVPdehn4EKd9PvBqCBHvq/9fL5AY5z1G11W62+3RG9rhpDCOlZhLo5lPSU2sME/6X7rgRzvbn4DPnPOyloxoJCKGaZh/iGnfVsN7UcR7FHCwc17WnvWNQkSLWoFRMeen6BQfDzxnMv1vyWLcKA7VMZ62TmM2Zdp8Yvr0R+HCRnWxHwTGesL/Fgs1N9KQRLyhdRW9avrnx/Rrc4PHIVNjd7XJwwP6VgLd6t1+EXDtrzURFGXS+7Xyps/cdFkvLnDTCSFErIiZg9WEDG4PZ4CDPbI3adrBTWKPU/1dEjp1n9Hr/jhkauxXYxLQvU70RIoj9Kg5LwSdrhurCNL/JUPaZiWrywoIIWJx2epnB0kyrVd9lxs/AHWp33a+izl91mTKZHqcbZyp/xAyNRbqHcgk61wGup07facn+3UX8LDzXWIPDwETTL9rgRfjxIf6ET/qUUtcBFxv5IsTNce0zVFr4ULKFO8upnu9mM+JajlctOuA3UTymZ5SRCkoubKUgHogYoymHd3s1zpd9NwU4RGeRfQrJadkLCPvRAzVnKi7PsngpysZEWRr/bypB9uo9Va/hwjKMxEt+iSMcdpkGpxjqu12VBJ2ddq26tZ7TaiwPBMha8JJpk0swtGO3oNizKksrO8kERZqNcZnbD4lOPJ9kfMXaxbehxvUY5ytxSYzTB8xscuSKhRCxGJP/C8t+tTX9yncGpDpnqFlBDY6LeVIc8vRLWRqxN2ZNCgoET5MM/WTa/SJbDd9LQmrgfPKrRgOIeKjLEbuweqY9knmu3iOnwLHeapsIvyiT0nZFTchU+MsrY7Pchv+LfBAzDkbMY+qbnt07Zjs2X12GHOaGCFEbKziawxDzW63S0lDw/SLYrbgqZG3mOUE84LKKn0KrtIq24ohb0ScYL5P1aPiyJtDFZJR2+IpQ06NPBEhRaOHFTkva9UdmrvI/GW3PE2NYTH6SC3DEg3NR9W5vhrtVMjTEyFu98v6uV83UuJTHKgRpzQlyiWRt8Vyur58u1YrW6qGvBHxj6c0uSooeB65WgVpk8CWMgUFX4qhoOEsF7J7OySHbwVH2NuTYvgm7UWbNcTd7VSQjPa8b5l3tKXVr6CvBd1YZwN3sTSLGxeZzyWaGa71279JsUwz36lh/22CRHjy8P8jikFcbNl2S3ZLql3SA/gXB5sfQmyUmLsAAAAASUVORK5CYII=" />
                          </defs>
                        </svg>
                        <p style={{
                          fontFamily: 'Montserrat',
                          fontStyle: 'normal',
                          fontWeight: 'bold',
                          fontSize: '15px',
                          lineHeight: '113.6%',
                          color: '#EB7926',
                          marginTop: '5px',
                          textAlign: 'center',
                        }}>NOTES</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-sm-6">
                    <Link to='/student/StudyMaterialSubject'>
                      <div class={Styles.smallbox}>
                        <i style={icon} class="fas fa-clipboard-check"></i>
                        <p style={text3}>Study Material</p>
                      </div>
                    </Link>
                  </div>
                  <div class="col-sm-6">
                    <div class={Styles.smallbox} data-toggle="modal" data-target="#exampleModal1">
                      <i style={icon} class="far fa-bell"></i>
                      <p style={text3}>NOTIFICATIONS</p>
                    </div>
                  </div>
                </div>
                <br /><br />
                <div class="row">
                  <div class="col-xs-12">
                    <div class={Styles.midbox}>
                      <p style={text1}>ATTENDANCE</p>
                      <div style={{ borderBottom: '1px solid #EB7926' }}></div>
                      <div class="row">
                        <div class="col-xs-3" style={{ marginTop: '10px' }}>
                          <p style={{ color: 'white', fontSize: '30px', borderBottom: '1px solid white', fontWeight: 'bold', fontFamily: 'Montserrat' }}>{this.state.attendance.attendance_count}</p>
                          <p style={{ color: 'white', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Montserrat' }}>{this.state.attendance.total_classes}</p>
                        </div>
                        <div class="col-xs-7" style={{ marginTop: '20px' }}>
                          {this.state.student_subjects_name.map((item) => (<div>
                            <p style={{ color: 'white', fontSize: '17px', fontWeight: 'bold', fontFamily: 'Montserrat', height: '20px' }}>{item} </p>
                          </div>))}
                        </div>
                        <div class="col-xs-2" style={{ marginTop: '20px' }}>
                          {this.state.subject_attendance.map((item) => (<div>
                            <p style={{ color: 'white', fontSize: '17px', fontWeight: 'bold', fontFamily: 'Montserrat', height: '20px' }}>{item.attendance_count}/{item.total_classes}</p>
                          </div>))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br /><br />
                <div class="row">
                  <div class="col-xs-12">
                    {this.state.upcoming_quiz.length === 0 ?
                      <Link to={{ pathname: '/student/objectivetest', state: { exam_type: 3 } }}>
                        <div class={Styles.midbox}>
                          <p style={text1}>QUIZ</p>
                          <div style={{ borderBottom: '1px solid #EB7926' }}></div><br />
                          <img src={quizImage} width='70%' /><br />
                          <button class="btn" style={{ background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px' }}>VIEW ALL</button>
                        </div>
                      </Link> : <Link to={{ pathname: '/student/objectivetest', state: { exam_type: 3 } }}>
                        <div class={Styles.midbox}>
                          <p style={text1}>QUIZ</p>
                          <div style={{ borderBottom: '1px solid #EB7926' }}></div><br />
                          {this.state.upcoming_quiz.map((item, index) => {
                            if (index == 0) {
                              return (<div style={{ padding: '10px', background: ' #ED7A27', borderRadius: '30px' }}><p style={{ fontFamily: 'Montserrat', fontSize: '25px', fontWeight: 'bold', color: '#544A43' }}>{item.exam_assoc.exam_topic}
                                <br /><br />Date : {dateFormat(item.exam_assoc.exam_start_date, 'd/mm/yyyy')}
                                <br /><br />Time : {dateFormat(item.exam_assoc.exam_start_date, 'h:MM TT')}
                              </p></div>)
                            }
                          })}<br />
                          <button class="btn" style={{ background: '#EB7926', borderRadius: '47px', fontWeight: 'bold', color: 'white', outline: 'none', fontSize: '20px', fontWeight: 'bold', marginTop: '30px', width: '200px', marginTop: '2px' }}>VIEW ALL</button>
                        </div>
                      </Link>
                    }
                  </div>
                </div>
              </div>
            </div>
            <br />
            {/*<div class="row" style={{marginTop:'70px'}}>
  <div class="col-md-4">

  </div>
  <div class="col-md-4">

  </div>
  <div class="col-md-4">
  <Link to='/student/videolectures'>
  <div style={box3}>
  <svg style={{width:'54',  height:'54'}} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M52.418 23.9418H38.0742V17.7572L49.6104 12.6875C50.8674 12.1351 50.8699 10.3443 49.6104 9.79078L27.6365 0.13417C27.2309 -0.0440723 26.7691 -0.0440723 26.3636 0.13417L4.38961 9.79078C3.13263 10.3431 3.1301 12.134 4.38961 12.6875L15.9206 17.7548V23.9418H1.58203C0.708328 23.9418 0 24.6502 0 25.5239V52.4184C0 53.2921 0.708328 54.0004 1.58203 54.0004H52.418C53.2917 54.0004 54 53.2921 54 52.4184V25.5239C54 24.6502 53.2917 23.9418 52.418 23.9418ZM8.95831 11.2391L27 3.31057L45.0417 11.2392L38.0742 14.3011V12.7674C38.0742 12.1686 37.7361 11.6211 37.2006 11.3529C37.0576 11.2813 33.6209 9.59809 27.0053 9.59809C20.3683 9.59809 16.9361 11.2817 16.7932 11.3533C16.2582 11.6216 15.9205 12.1689 15.9205 12.7674V14.2987L8.95831 11.2391ZM34.9102 23.8311H19.0846V13.8504C23.4542 12.4066 30.4876 12.3892 34.9102 13.8501C34.9102 16.296 34.9048 20.9409 34.9102 23.8311ZM3.16406 27.1059H9.59766C9.59766 30.5952 6.75886 33.434 3.26953 33.434H3.16406V27.1059ZM3.16406 50.8364V44.5083H3.26953C6.75886 44.5083 9.59766 47.3471 9.59766 50.8364H3.16406ZM50.8359 50.8364H44.4721C44.4721 47.3471 47.3109 44.5083 50.8002 44.5083H50.8359V50.8364ZM50.8359 41.3442H50.8002C45.5662 41.3442 41.308 45.6024 41.308 50.8364H12.7617C12.7617 45.6024 8.50352 41.3442 3.26953 41.3442H3.16406V36.5981H3.26953C8.50352 36.5981 12.7617 32.3399 12.7617 27.1059H41.308C41.308 32.3399 45.5662 36.5981 50.8002 36.5981H50.8359V41.3442ZM50.8359 33.434H50.8002C47.3109 33.434 44.4721 30.5952 44.4721 27.1059H50.8359V33.434Z" fill="white"/>
  </svg>
  <br/>
  <button style={btn1}>Video Lectures</button>
  </div>
  </Link>
  </div>
</div>
*/}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Student;
