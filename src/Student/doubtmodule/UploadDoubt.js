import { Component } from 'react';
import StudentSearch from './form';
import Table from './table';
import Studentnav from '../studentnav';
import { Container, Row, Col } from 'react-bootstrap';
import Style from './doubt.module.css';
import Config from '../../config.json';
import axios from 'axios';

class UploadDoubtStudent extends Component {

  onPendingDoubt = () => {
    this.props.history.push(
      {
        pathname: '/student/doubtmodule/pendingdoubts',
      }
    )
  }
  render() {
    return (<div>
      <Studentnav />
      <div className="container" style={{ marginTop: '7vh' }}>
        <div className="row">
          <button onClick={this.onPendingDoubt} style={{ border: 'none', background: 'none', float: 'right', padding: 'none' }}><svg style={{ display: 'inline-block', float: 'right', margin: '6px 0px 0px 10px' }} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289L8.34315 0.928932C7.95262 0.538408 7.31946 0.538408 6.92893 0.928932C6.53841 1.31946 6.53841 1.95262 6.92893 2.34315L12.5858 8L6.92893 13.6569C6.53841 14.0474 6.53841 14.6805 6.92893 15.0711C7.31946 15.4616 7.95262 15.4616 8.34315 15.0711L14.7071 8.70711ZM0 9H14V7H0V9Z" fill="#EB7926" />
          </svg>
            <p style={{ fontFamily: 'Montserrat', fontSize: '20px', fontWeight: 'bold', color: '#EA7A26', float: 'right' }}>View Pending Doubts</p></button>
          <StudentSearch history={this.props.history} />
          {/* <Table /> */}
        </div>
      </div>
    </div>
    );
  }
}

export default UploadDoubtStudent;
