import { Component } from 'react';
import ObjectiveResultSideNav from './SideNav.js';
import Styles from './sidenav.module.css';
import axios from 'axios';
import Config from '../../config.json';
import Chart from "react-apexcharts";
import Question from './ObjectiveQuestions.js';
import Solution from './ObjectiveSolutions.js';

class SolutionsObjectiveResult extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");

    data = JSON.parse(data);
    let student = data.username;
    this.state = {
      token: data.token,
      student: student,
      isloading: false,
      result: '',
      exam_id: '',
      questions: '',
      selectedquestion: '',
      selectedindex: 0,
    }
  }
  componentDidMount = () => {
    console.log(this.props);
    var requestOptions = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + 'student/get-student-objective-alloted-questions/?student=' + this.state.student + '&exam=' + this.props.location.state.exam_id, requestOptions)
      .then(response => {
        console.log(response.data)
        const cls = response.data;
        this.setState({
          questions: cls,
          selectedquestion: cls[0],
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }

  onQuestionClick = (item) => {
    this.setState({
      selectedindex: item,
      selectedquestion: this.state.questions[item],
    });
  }

  render() {
    if (this.state.questions) {
      var navigate;
      navigate = this.state.questions.map((item, index) => {
        if (index == this.state.selectedindex) {
          if (item.ans_given != '0') {
            return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid #4169E1', background: '#EA7A26', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
          }
          else {
            return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '2px solid #4169E1', background: '#D6D6D6', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
          }
        } else {
          if (item.ans_given != '0') {
            return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#EA7A26', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'white', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
          } else {
            return <div class="col-xs-3" style={{ marginTop: "10px" }}><center><div style={{ border: '1px solid #BABABA', background: '#D6D6D6', textAlign: 'center', borderRadius: '50%', width: "35px", height: '35px', color: 'grey', paddingTop: '5px', cursor: 'pointer' }} onClick={() => { this.onQuestionClick(index) }}>{index + 1}</div></center></div>
          }
        }
      })
    }

    var gap2 = {
      margin: '0px',
      padding: '0px',
    }
    var nav = {
      border: 'none',
      width: '100%',
      boxShadow: '1px 2px 5px lightgrey',
    }
    var title = {
      display: 'inline-block',
    }
    var icons = {
      display: 'inline-block',
      float: 'right',
      padding: ' 2px 10px 0px 0px',
    }
    var i = {
      fontSize: '25px',
      margin: '0px 10px 0px 0px',
    }
    var text2 = {
      padding: "13px 10px 5px 10px",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#1D1D1D",
      fontWeight: "bold",
    }
    var img3 = {
      marginTop: "5px",
    }
    var spacing = {
      margin: '50px 20px 0px 20px'
    }
    var h2 = {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      color: '#000000',
    }
    var form = {
      margin: '30px 0px 20px 0px'

    }
    var form3 = {
      marginTop: '30px'
    }
    var form1 = {
      marginTop: '30px',
      width: '100%',
    }
    var loader = {
      marginTop: '15px'
    }
    return (
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <ObjectiveResultSideNav exam_id={this.props.location.state.exam_id} />
            </div>

            <div class="col-md-9" style={{ padding: '0px' }}>
              <nav id={Styles.nav}>
                <div style={title}>
                  <p style={text2}>Solutions</p>
                </div>
                <div style={icons}>
                  <i style={i} class="fas fa-bell"></i>
                  <svg style={img3} width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z" fill="#E8E8E8" />
                    <path d="M31.0871 28.5241C29.4473 30.5468 27.3766 32.1779 25.0261 33.2983C22.6755 34.4187 20.1045 35.0002 17.5006 35.0002C14.8967 35.0002 12.3256 34.4187 9.97507 33.2983C7.62453 32.1779 5.55382 30.5468 3.91406 28.5241C6.11938 25.8293 9.16783 23.9557 12.5681 23.2051C12.5002 24.6394 12.7544 26.0708 13.3121 27.3941C14.2771 25.1941 17.5011 24.9941 17.5011 24.9941C17.5011 24.9941 20.7251 25.1871 21.6621 27.3941C22.234 26.0751 22.4888 24.6404 22.4061 23.2051C25.3001 23.9491 28.8271 25.4651 31.0871 28.5241Z" fill="#029EDC" />
                    <path d="M21.442 21.496C21.442 21.496 21.635 23.48 17.501 25.024C17.501 25.024 20.725 25.217 21.662 27.424C21.718 27.476 23.564 22.681 21.442 21.496Z" fill="#0061B5" />
                    <path d="M13.559 21.496C11.437 22.681 13.283 27.476 13.339 27.396C14.304 25.196 17.5 24.996 17.5 24.996C13.366 23.48 13.559 21.496 13.559 21.496Z" fill="#0061B5" />
                    <path d="M20.5042 4.87805C20.7242 2.34305 16.7041 2.50805 16.7041 2.50805C15.0175 2.71576 13.445 3.46902 12.2261 4.65309C11.0072 5.83717 10.2087 7.38718 9.95215 9.06705L10.7791 8.07505C9.47914 10.9141 11.4402 15.792 11.6062 16.175C12.6262 19.565 14.8861 22.675 17.5061 22.675C20.1261 22.675 22.3841 19.561 23.4061 16.175V16.147C23.5161 15.734 23.6261 15.3201 23.7061 14.9071H23.6781C24.2291 12.7071 24.8351 10.4701 24.8351 10.4701C26.4021 2.56305 20.5042 4.87805 20.5042 4.87805ZM23.2872 14.5241C23.0607 16.2353 22.2762 17.824 21.0551 19.044C20.821 19.2711 20.5725 19.4829 20.3111 19.6781L19.8701 18.3H15.1301L14.6891 19.7061C13.8071 19.0451 11.9612 17.1981 11.9332 15.4621C11.1612 5.56805 18.7401 7.66205 18.7401 7.66205C23.8391 7.27605 23.6731 11.7681 23.2881 14.5241H23.2872Z" fill="#029EDC" />
                    <path d="M15.571 19.2361C15.8125 19.5104 16.1091 19.7307 16.4415 19.8827C16.7739 20.0347 17.1346 20.1149 17.5 20.1181C17.8665 20.1209 18.2291 20.0434 18.5624 19.891C18.8956 19.7386 19.1915 19.5151 19.429 19.2361H15.571Z" fill="white" />
                  </svg>
                </div>
              </nav>
              <div class="gap" style={{ marginTop: '60px' }}>
                <div class="col-sm-8" style={{ marginBottom: '20px' }}>
                  <div class="box">
                    {this.state.selectedquestion == '' ? (<div></div>) : (<div><Question testing={this.state.selectedquestion} index={this.state.selectedindex} /></div>)}
                  </div>
                </div>

                <div class="col-sm-4">
                  <div class="box" style={{ border: '1px solid #BEC5D3', padding: '15px 5px 15px 5px', borderRadius: '10px', height: 'auto', maxHeight: '300px', overflow: 'auto' }}>
                    {navigate}
                  </div>
                </div>
              </div>
              <div class="gap" style={{ marginTop: '40px' }}>
                <div class="col-sm-12">
                  {this.state.selectedquestion == '' ? (<div></div>) : (<div><Solution testing={this.state.selectedquestion} /></div>)}

                </div>
              </div>


            </div>
          </div>


        </div>
        <br />
      </div>

    );
  }
}
export default SolutionsObjectiveResult;