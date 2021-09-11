import { Component } from 'react';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import Config from '../../config.json';
import axios from 'axios';
import Studentnav from '../studentnav';
import Issue from '../Issue';

class ListOfNotes extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.state = {
      user: data.username,
      token: data.token,
      isloading: false,
      notes: [],
      chapter: '',
    }
    this.baseState = this.state;
  }
  componentDidMount = () => {
    var requestOptions1 = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + `support/get-teacher-notes/?chapter=${this.props.location.state.Notes}`, requestOptions1)
      .then(response => {
        const ch = response.data;
        console.log(response.data)
        this.setState({
          notes: ch,
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
    var formdata = new FormData();
    this.setState({ isloading: true });
    formdata.append('page_name', 'List-Of-Notes');
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
  }
  onView = (item) => {
    console.log(item);
    window.open(item, '_blank');
  }

  render() {
    console.log(this.state.subjects);
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
          <div>

            <div className="row" style={{ marginTop: '50px' }}>
              <div className="col-md-12">
                <div class="title">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', display: 'inline-block' }}>{this.state.chapter.chapter_name}</p>
                </div>

                <div class="row" style={{ marginTop: '50px' }}>
                  {this.state.notes.map((item) => {
                    return (<div class="col-md-3" style={{ marginBottom: '30px' }}>
                      <div class="box" style={{ padding: '0 0 10px 0', borderRadius: '10px', boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)' }}><center><img src={item.notes_icon} style={{ width: '100%', height: 'auto', marginBottom: '20px' }} /></center><div class="row"><center><div class="col-xs-12"><p style={{ fontSize: '12px', fontFamily: 'Montserrat', color: '#686868', fontWeight: 'bold' }}>{item.notes_desc}</p></div></center></div><br /><center><button onClick={() => this.onView(item.notes_file)} type="button" class="btn" style={{ border: 'none', color: 'white', background: '#EB7926', fontSize: '10px', fontFamily: 'Montserrat', borderRadius: '63px', width: '100px' }}>View</button></center></div></div>)
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }
}
export default ListOfNotes;
