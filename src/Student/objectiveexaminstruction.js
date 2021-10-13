import { Component } from 'react';
import Navcomp from '../nav';
import axios from 'axios';
import parse from 'html-react-parser';
import Config from '../config.json';
import Studentnav from './studentnav';
import ReactLoading from "react-loading";
import dateFormat from 'dateformat';
class ObjectiveExamInstruction extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    let student = data.username;
    this.state = {
      token: data.token,
      student: student,
      test: '',
      isloading: false,
      isRead: false,
      exam_time: ''
    }
  }
  componentDidMount = () => {
    var requestOptions = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token' + this.state.token
      },
    };
    console.log(this.props.location.state.examdetails.exam_assoc)
    let formdata = new FormData()
    formdata.append('exam', this.props.location.state.examdetails.exam_assoc.id)
    formdata.append('student', this.state.student)
    axios.post(Config.SERVER_URL + `student/instruction-objective-exam`, formdata).then((data) => {
      console.log(data.data)
      this.setState({
        exam_time: data.data.end_time
      })
    }).catch((err) => {
      console.log(err)
    })
    console.log(this.props.location.state.examdetails.exam_assoc)
    if (typeof (this.props.location.state) != 'undefined') {
      console.log(this.props.location.state.examdetails, 'exam details');
      this.setState({ test: this.props.location.state.examdetails.exam_assoc })
    }
    else {
      this.props.history.push('/');
    }
  }

  onInstructionRead = (event) => {
    this.setState({
      isRead: event.target.checked,
    });
  }
  onStartclick = () => {
    this.setState({
      isloading: true
    })
    if (this.props.location.state.exam_type === 1) {
      var formdata = new FormData();
      formdata.append("exam", this.state.test.id);
      formdata.append("student", this.state.student);
      var requestOptions = {
        method: 'POST',

        body: formdata,
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.state.token,
          // 'access-control-allow-origin':'*',
          // "Access-Control-Allow-Headers":'Accept'  ,
          // 'accept':'application/json'
        },
      };
      fetch(Config.SERVER_URL + "student/start-objective-exam/", requestOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({
            isloading: false
          })
          console.log(json);
          if (typeof (json.Error) === 'undefined') {
            //  console.log(json);

            this.props.history.push({
              pathname: '/student/StudentObjectiveTest',
              state: { questions: json, examdetails: this.state.test },
            })
          }
          else { alert(json.Error) }
        })
        .catch(error => {
          console.log('error', error);
        })
    } else {
      var formdata = new FormData();
      formdata.append("exam", this.state.test.id);
      formdata.append("student", this.state.student);
      var requestOptions = {
        method: 'POST',

        body: formdata,
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Token ' + this.state.token,
          // 'access-control-allow-origin':'*',
          // "Access-Control-Allow-Headers":'Accept'  ,
          // 'accept':'application/json'
        },
      };
      fetch(Config.SERVER_URL + "student/start-objective-exam/", requestOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({
            isloading: false
          })
          console.log(json);
          if (typeof (json.Error) === 'undefined') {
            //  console.log(json);

            this.props.history.push({
              pathname: '/student/objectiveexam',
              state: { questions: json, examdetails: this.state.test },
            })
          }
          else { alert(json.Error) }
        })
        .catch(error => {
          console.log('error', error);
        })
    }
  }
  render() {
    var instructions;
    if (this.state.test != '') {
      instructions = parse(this.state.test.exam_instructions)
    }
    return (
      <div >
        <Studentnav />
        {this.state.isloading ? <div>
          <br /><br />
          <center>
            <ReactLoading type="spinningBubbles" color="blue" height="3px" /><br /><br /><br /><br />
            <p>Please Wait While we are Redirecting and do not press back button</p>
          </center>
        </div> :
          <div class="container">
            <div class="row" style={{ marginTop: '30px' }}>
              <div class="col-md-12">
                <center>
                  <p style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold' }}>Exam Instructions</p>
                  <hr style={{ width: '10%', border: '1px solid black', background: 'black', margin: '0' }} />
                  <p style={{ marginTop: '20px', fontSize: '17px', background: '#1C3687', borderRadius: '44px', width: '300px', color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold', padding: '5px' }}>Exam : {this.state.test.exam_topic}</p>
                </center>
                <div style={{ marginTop: '50px' }}>
                  <p style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#EB7926' }}>Important Instructions:</p>
                  <p style={{ fontSize: '18px', fontFamily: 'Montserrat', padding: '10px' }}>{instructions}</p>
                </div>
                <center>
                  <button className='btn btn-primary' style={{ border: 'none', background: '#1C3687', marginTop: '30px', borderRadius: '29px', fontSize: '16px', width: '200px', marginRight: '10px' }} onClick={this.onStartclick}>CONTINUE EXAM</button>
                  <button className='btn btn-primary' style={{ border: 'none', background: '#EB7926', marginTop: '30px', borderRadius: '29px', fontSize: '16px', width: '200px' }} onClick={() => { this.props.history.push('/') }}>TAKE LATER</button><br /><br />
                  <h2>If you click continue exam now your exam will end : {dateFormat(this.state.exam_time, "shortTime")} </h2>
                </center>
              </div>
            </div>
          </div>
        }
        <br />
      </div>
    );
  }
}
export default ObjectiveExamInstruction;
