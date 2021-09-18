import { Component } from 'react';
import ObjectiveResultSideNav from './SideNav.js';
import Styles from './sidenav.module.css';
import axios from 'axios';
import Config from '../../config.json';
import MaterialTable from 'material-table';
import dateFormat from 'dateformat';

class ChapterWiseScore extends Component {
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
      chapters: '',
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
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    axios.get(Config.SERVER_URL + 'student/get-objective-exam-chapters/?exam=' + this.props.location.state.exam_id, requestOptions)
      .then(response => {
        const lang = response.data;
        console.log(lang);
        this.setState({
          chapters: lang,
          isloading: false,

        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }
  render() {
    if (this.state.questions && this.state.chapters) {
      var positive_marks = Number(this.state.chapters[0].exam_assoc.positive_marks_per_ques);
      var negative_marks = Number(this.state.chapters[0].exam_assoc.negative_marks_per_ques);
      var result = [];
      {
        this.state.chapters.map((item) => {
          var obj = {};
          var correctno = 0;
          var incorrectno = 0;
          var notansno = 0;
          obj['chapter_id'] = item.chapter_assoc.id;
          obj['chapter_name'] = item.chapter_assoc.chapter_name;
          for (var i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].question_assoc.chapter_assoc == item.chapter_assoc.id) {
              if (this.state.questions[i].ans_given == 0) {
                notansno = notansno + 1;
              }
              else if (this.state.questions[i].ans_given != 0) {
                if (this.state.questions[i].is_correct == "No") {
                  incorrectno = incorrectno + 1;
                }
                else if (this.state.questions[i].is_correct == "Yes") {
                  correctno = correctno + 1;
                }
              }
            }
          }
          var score = correctno * positive_marks - incorrectno * negative_marks;
          obj['score'] = score;
          obj['notansno'] = notansno;
          obj['incorrectno'] = incorrectno;
          obj['correctno'] = correctno;
          result.push(obj);
        })
      }
      var table;
      table = <MaterialTable style={{ position: 'sticky', borderBottom: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
        title="List Of All Exams"
        columns={[
          { title: 'Chapter Name', field: 'chapter_name', width: '10%' },
          { title: 'Correct', field: 'correctno' },
          { title: 'Incorrect', field: 'incorrectno' },
          { title: 'Not Answered', field: 'notansno' },
          { title: 'Score', field: 'score' },

        ]}
        data={result}
        options={{
          headerStyle: {
            backgroundColor: ' #E1E1E1',
            color: '#272C49',
            fontSize: '16px',
            fontWeight: 'Montserrat',
          },
          toolbar: false,
          search: false,
          sorting: true,
        }}

      />
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
                  <p style={text2}>Accuracy</p>
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
              <div class="gap" style={{ marginTop: '100px' }}>
                <div class="col-md-12">
                  {table}
                  <br />
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>

    );
  }
}
export default ChapterWiseScore;
