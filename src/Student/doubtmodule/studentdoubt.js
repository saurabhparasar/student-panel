import { Component } from 'react';
import StudentSearch from './form';
import Table from './table';
import Studentnav from '../studentnav';

class StudentDoubt extends Component {
  render(){
  return (<div>
    <Studentnav/>

      <div className="container-fluid">

        <div>
         <div className="row">
           <StudentSearch history={this.props.history}/>
          </div>
          <div class="row">
             <Table/>
          </div>
          </div>
     </div>
     </div>


  );
}}

export default StudentDoubt;
