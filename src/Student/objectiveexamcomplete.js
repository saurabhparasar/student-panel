import {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Config from '../config.json';
import Question from './objectivequestion';
import Studentnav from './studentnav';

class ObjectiveExamComplete extends Component {
  constructor(){
    super();
    let data=localStorage.getItem("userdetail");

    data= JSON.parse(data);
     let student=data.username;
   this.state={
       token:data.token,
       student:student,
       isloading:false
       }

}
viewresult=()=>{
  if(this.props){

    this.props.history.push({
      pathname:'/student/objectiveresult/percentileandscore',
      state:{exam_id: this.props.location.state.exam_id},
    })
  }
}
  render(){
    console.log(this.props);
    if(this.props.location.state.exam_complete){

  return (
    <div >
      <Studentnav/>
      <div class="container">
      <div class="row">
      <div class="col-sm-12" style={{marginTop:'100px'}}>
      <center>
      <div class="box" style={{boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.15)', padding:'30px', borderRadius:'17px', width:'70%'}}>
      <i class="fas fa-check" style={{marginTop:'25px' ,color:'lightgreen', fontSize:'40px'}}></i>
      <p style={{marginTop:'20px', fontFamily:'Montserrat', fontSize:'18px'}}>Exam Submitted Successfully</p>
      </div>
      <button onClick={this.viewresult} class="btn" style={{marginTop:'30px', border:'none', borderRadius:'29px', background:'#EB7926', color:'white', fontFamily:'Montserrat', fontWeight:'bold', width:'200px'}}>View Result</button>
      </center>
      </div>
      </div>
      <br/>
    </div>
    </div>

  );
}
else{
  return (
    <div >
      <Studentnav/>
      <div class="container">
      <div class="row">
      <div class="col-sm-12" style={{marginTop:'100px'}}>
      <center>
      <div class="box" style={{boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.15)', padding:'30px', borderRadius:'17px', width:'70%'}}>
      <p style={{marginTop:'50px', fontFamily:'Montserrat', fontSize:'18px'}}>Something Went Wrong Please Contact The Admin</p>
      </div>
      </center>
      </div>
      </div>
      <br/>
    </div>
    </div>

  );
}
}
}
export default ObjectiveExamComplete;
