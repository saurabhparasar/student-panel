import { Component } from 'react';
import Studentnav from './studentnav';
import ReactLoading from 'react-loading';
import axios from 'axios';
import Styles from './studentnav.module.css';
import Config from '../config.json';
class VideoLectures extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    let studentname = data.username;
    this.state = {
      token: data.token,
      student: studentname,
      subject: [],
      valid_subject: [],
      isloading: false,
    }
  }
  Logout = () => {
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount = () => {
    this.setState({ isloading: true });
    var requestOptions = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + this.state.student, requestOptions)
      .then(response => {
        console.log(response.data)
        let classid = response.data.class_assoc.id;
        console.log(classid);
        axios.get(Config.SERVER_URL + 'support/get-subjects/?class=' + classid, requestOptions)
          .then(response => {
            const lang = response.data;
            console.log(lang);
            this.setState({
              subject: lang,
              isloading: false,
            });
          });
      });
    axios.get(Config.SERVER_URL + 'student/get-video-lectures-subjects/?student=' + this.state.student, requestOptions)
      .then(response => {
        const lang = response.data;
        console.log(lang);
        this.setState({
          valid_subject: lang,

        });
      });
  }
  onSubjectClick = (item) => {
    const found = this.state.valid_subject.subjects_info.find(element => element == item.id);
    if (typeof (found) == "undefined") {

    }
    else {
      this.props.history.push({
        pathname: '/student/subjectvideos',
        state: { subject: item.id },
      })
    }
  }
  onJoinCourseClick = () => {
    this.props.history.push('/student/payment'
    );
  }
  render() {
    var load;
    if (this.state.isloading) {
      load = (<p><ReactLoading type="cylon" color="#09AEE5" /></p>);
    }
    var dashboard = {
      marginTop: '50px'
    }
    var box1 = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '175px',
      background: 'linear-gradient(90.18deg, #9EC8FF 2.43%, #00AEEF 99.83%)',
      textAlign: 'center'
    }
    var btn1 = {
      border: 'none',
      marginTop: '30px',
      width: '150px',
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

    return (
      <div>
        <Studentnav />

        <div style={dashboard}>
          <div class="container">
            {load}
            <br />
            <div class="row">


              {this.state.subject.map((item) => {
                return <div class={Styles.column} key={item.id}> <div style={box1}>
                  <svg style={{ width: '54', height: '54' }} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52.418 23.9418H38.0742V17.7572L49.6104 12.6875C50.8674 12.1351 50.8699 10.3443 49.6104 9.79078L27.6365 0.13417C27.2309 -0.0440723 26.7691 -0.0440723 26.3636 0.13417L4.38961 9.79078C3.13263 10.3431 3.1301 12.134 4.38961 12.6875L15.9206 17.7548V23.9418H1.58203C0.708328 23.9418 0 24.6502 0 25.5239V52.4184C0 53.2921 0.708328 54.0004 1.58203 54.0004H52.418C53.2917 54.0004 54 53.2921 54 52.4184V25.5239C54 24.6502 53.2917 23.9418 52.418 23.9418ZM8.95831 11.2391L27 3.31057L45.0417 11.2392L38.0742 14.3011V12.7674C38.0742 12.1686 37.7361 11.6211 37.2006 11.3529C37.0576 11.2813 33.6209 9.59809 27.0053 9.59809C20.3683 9.59809 16.9361 11.2817 16.7932 11.3533C16.2582 11.6216 15.9205 12.1689 15.9205 12.7674V14.2987L8.95831 11.2391ZM34.9102 23.8311H19.0846V13.8504C23.4542 12.4066 30.4876 12.3892 34.9102 13.8501C34.9102 16.296 34.9048 20.9409 34.9102 23.8311ZM3.16406 27.1059H9.59766C9.59766 30.5952 6.75886 33.434 3.26953 33.434H3.16406V27.1059ZM3.16406 50.8364V44.5083H3.26953C6.75886 44.5083 9.59766 47.3471 9.59766 50.8364H3.16406ZM50.8359 50.8364H44.4721C44.4721 47.3471 47.3109 44.5083 50.8002 44.5083H50.8359V50.8364ZM50.8359 41.3442H50.8002C45.5662 41.3442 41.308 45.6024 41.308 50.8364H12.7617C12.7617 45.6024 8.50352 41.3442 3.26953 41.3442H3.16406V36.5981H3.26953C8.50352 36.5981 12.7617 32.3399 12.7617 27.1059H41.308C41.308 32.3399 45.5662 36.5981 50.8002 36.5981H50.8359V41.3442ZM50.8359 33.434H50.8002C47.3109 33.434 44.4721 30.5952 44.4721 27.1059H50.8359V33.434Z" fill="white" />
                  </svg>
                  <br />
                  <button style={btn1} data-toggle="modal" data-target="#myModal" onClick={() => this.onSubjectClick(item)}>{item.subject_name}</button>
                </div>
                </div>
              })}

            </div>
          </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">JOIN COURSE: </h4>
              </div>
              <div class="modal-body">
                Check out our other courses to access this Subject<br />
                <button style={btn1} data-dismiss="modal" onClick={this.onJoinCourseClick}>Join Courses</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default VideoLectures;