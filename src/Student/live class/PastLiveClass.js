import { Component } from 'react';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import Config from '../../config.json';
import axios from 'axios';
import Studentnav from '../studentnav';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Issue from '../Issue';
class PastLiveClass extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      book_id: '',
      classes: [],
      user: data.username,
      token: data.token,
      message: '',
      notes: '',
      assignments: '',
      solution_video: '',
      assignment_live_class_id: [],
      notes_live_class_id: [],
      isloading: false,
      section: '',
      school: '',
      student_id: '',
    }
    this.baseState = this.state;
  }
  componentDidMount = () => {
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append('page_name', 'Past-Live-Class');
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
        console.log(json);
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    var requestOptions1 = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };






    axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + this.state.user, requestOptions1)
      .then(response => {
        console.log(response.data)
        const ch = response.data;
        this.setState({
          section: ch.student_data.section_assoc.id,
          school: ch.student_data.school_assoc.id,
          student_id: ch.student_data.id,
          // isloading: false,
        });

        let section = ch.student_data.section_assoc.id;
        let school = ch.student_data.school_assoc.id;

        axios.get(Config.SERVER_URL + 'student/get-past-live-classes/?section=' + section + '&school=' + school, requestOptions1)
          .then(response => {
            console.log(response.data)
            const ch = response.data;
            this.setState({
              classes: ch,
              isloading: false,
            });
          })
          .catch(error => {
            this.props.history.push('/error');
          });

      })
      .catch(error => {
        this.props.history.push('/error');
      });


    axios.get(Config.SERVER_URL + 'student/get-live-class-notes/', requestOptions1)
      .then(response => {
        console.log(response.data)
        const ch = response.data;
        var arr = [];
        for (var i = 0; i < ch.length; i++) {
          arr.push(ch[i].live_class_assoc);
        }
        console.log(arr);
        this.setState({
          notes_live_class_id: arr,
          notes: ch,
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    axios.get(Config.SERVER_URL + 'student/live-class-assignments/', requestOptions1)
      .then(response => {
        console.log(response.data)
        const ch = response.data;
        var arr = [];
        for (var i = 0; i < ch.length; i++) {
          arr.push(ch[i].live_class_assoc);
        }
        this.setState({
          assignments: ch,
          assignment_live_class_id: arr,
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }
  selectedOption = (item) => {
    this.setState({
      solution_video: item,
    })
  }
  onNotes = (id) => {
    console.log(id);
    this.state.notes.map((item) => {
      if (item.live_class_assoc == id) {
        window.location.href = item.notes_assoc.notes_file;
      }
    })
  }
  onAssignment = (id) => {
    console.log(id);
    this.state.assignments.map((item) => {
      if (item.live_class_assoc == id) {
        this.props.history.push({
          pathname: '/student/objectiveexaminstruction',
          state: { examdetails: item },
        });
      }
    })
  }
  onUpdateClick = (item) => {
    this.props.history.push(
      {
        pathname: '/student/doubtmodule/questionlist',
        state: { chapter_id: item },
      }
    )
  }
  upcomingclass = () => {
    this.props.push('/student/liveclass/upcomingliveclass')
  }
  render() {
    console.log(this.state.assignment_live_class_id);
    var mess = (<p>{this.state.message}</p>);
    var load;
    if (this.state.isloading) {
      load = (<p><ReactLoading type="spinningBubbles" color="blue" height="3px" /></p>)
    }
    var dateFormat = require("dateformat");
    var now = new Date();

    return (
      <div>
        <Issue />
        <Studentnav />
        <div className="container">
          {load}
          <div>
            <div id="answer_video" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" onClick={() => { this.setState({ solution_video: null }) }} data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Video: </h4>
                  </div>
                  <div class="modal-body">

                    <ReactPlayer
                      config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                      onContextMenu={e => e.preventDefault()}
                      playing={this.state.playing}
                      controls url={this.state.solution_video} width='100%' />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: '50px' }}>
              <div className="col-md-12">
                <div class="title">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', display: 'inline-block' }}>Past Live Classes</p>
                  <div style={{ float: 'right', 'margin-left': '20px' }}><a href={"https://class.zinedu.com/WEBStudent/StudentPageAccess?StudentId=" + this.state.student_id + "&PageName=LiveClasses"} className="btn btn-primary" >View Previous Live Classes</a></div>
                  <Link to='/student/liveclass/upcomingliveclass'><p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', float: 'right', color: '#EB7926', cursor: 'pointer' }}><svg style={{ marginRight: '10px', marginBottom: '-2px' }} width="17" height="17" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0401 0H3.95986C1.77275 0 0 1.69104 0 3.78415V21.1004C0 21.8351 0.881601 22.2647 1.50376 21.8189L5.27981 19.1125H16.0401C18.2273 19.1125 20 17.4215 20 15.3284V3.78415C20 1.69408 18.2304 0 16.0401 0ZM9.06003 14.3025H4.96653C4.44741 14.3025 4.02668 13.9005 4.02668 13.4044C4.02668 12.9083 4.44741 12.5062 4.96653 12.5062H9.06003C9.57915 12.5062 9.99988 12.9083 9.99988 13.4044C9.99988 13.9005 9.57915 14.3025 9.06003 14.3025ZM15.0335 10.4545H4.96653C4.44741 10.4545 4.02668 10.0522 4.02668 9.55639C4.02668 9.0603 4.44741 8.65824 4.96653 8.65824H15.0335C15.5523 8.65824 15.9733 9.0603 15.9733 9.55639C15.9733 10.0522 15.5526 10.4545 15.0335 10.4545ZM15.0335 6.6063H4.96653C4.44741 6.6063 4.02668 6.20424 4.02668 5.70815C4.02668 5.2123 4.44741 4.81 4.96653 4.81H15.0335C15.5523 4.81 15.9733 5.2123 15.9733 5.70815C15.9733 6.20424 15.5526 6.6063 15.0335 6.6063Z" fill="#EB7926" />
                  </svg>
                    Upcoming Live Classes</p></Link>



                </div>

                {/*<div class="search" style={{float:'right'}}>
<form class="example">
<input type="text" placeholder="Search.." name="search2"/>
<button type="submit"><i class="fa fa-search"></i></button>
</form>
</div>
  */}
                <div class="row" style={{ marginTop: '50px' }}>
                  {this.state.classes.map((item) => (<div class="col-md-3" style={{ marginBottom: '30px', minHeight: '300px' }}>
                    <div class="box" style={{ padding: '0 0 10px 0', borderRadius: '10px', boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)', minHeight: '250px' }}><center>{item.liveclass_assoc.faculty_assoc == null ? (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTE7TaFam0szWmbgEhzU4g4vuZdZyk2EgeADGxJnVJfOMhYS0KZRKMJTiQUKuRpSispA&usqp=CAU" style={{ width: '100%', height: '150px', marginBottom: '20px' }} />) : (<img src={item.liveclass_assoc.faculty_assoc} style={{ width: '100%', height: '150px', marginBottom: '20px' }} />)}</center><div class="row" style={{ width: '100%', height: '50px' }}><center><div class="col-xs-6"><p style={{ fontSize: '12px', fontFamily: 'Montserrat', color: '#686868' }}>{item.liveclass_assoc.chapter_assoc}</p></div><div class="col-xs-6" ><p style={{ fontSize: '12px', fontFamily: 'Montserrat', color: '#686868', fontWeight: 'bold' }}>{dateFormat(item.liveclass_assoc.start_date, "ddd mm/dd/yyyy hh:MM")}</p></div></center></div><br /><center><button type="button" data-toggle="modal" data-target="#answer_video" onClick={() => this.selectedOption(item.live_class_url)} class="btn" style={{ border: 'none', color: 'white', background: '#EB7926', fontSize: '10px', fontFamily: 'Montserrat', borderRadius: '63px', marginRight: '10px' }}>Replay Class</button>{this.state.notes_live_class_id.includes(item.liveclass_assoc.id) ? (<button type="button" class="btn" onClick={() => this.onNotes(item.liveclass_assoc.id)} style={{ border: 'none', color: 'white', background: '#1C3687', fontSize: '10px', fontFamily: 'Montserrat', borderRadius: '63px', marginRight: '10px' }}>Notes</button>) : (<button style={{ display: 'none' }}></button>)}{this.state.assignment_live_class_id.includes(item.liveclass_assoc.id) ? (<button onClick={() => this.onAssignment(item.liveclass_assoc.id)} type="button" class="btn" style={{ border: '1px solid #EB7926', color: '#EB7926', background: 'none', fontSize: '10px', fontFamily: 'Montserrat', borderRadius: '63px' }}>DPP</button>) : (<button style={{ display: 'none' }}></button>)}</center></div></div>))}
                  <div class="col-md-3">

                    {/*<iframe width="100%" height="auto" src="https://www.youtube.com/embed/ot4wE7-B7jQ" title="YouTube video player" frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}
export default PastLiveClass;
