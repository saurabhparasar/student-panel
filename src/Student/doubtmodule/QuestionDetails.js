import {Component} from 'react';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import Config from '../../config.json';
import axios from 'axios';
import ReactPlayer from 'react-player';

class QuestionDetailsStudentDoubt extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
       this.state={
           question_details:'',
           playing:false,
           user:data.username,
           token:data.token,
           message:'',
           isloading:false,
       }
       this.baseState=this.state;
   }
   componentDidMount=()=>{
    var formdata = new FormData();
    this.setState({isloading:true});
    formdata.append('page_name','Question-Details-Student-Doubt');
   var requestOptions = {
       method: 'POST',
       body: formdata,
       redirect: 'follow',
       headers:{
           'Authorization': 'Token '+ this.state.token
       },
     };
     fetch(Config.SERVER_URL+"users/post-analytics/",requestOptions)
     .then(response => response.json())
     .then(json => {console.log(json);
        })
       .catch(error => {
      this.props.history.push('/error');
   });

this.setState({
  question_details:this.props.location.state.question,
})
}



onUpdateClick=(item)=>{
  this.props.history.push(
    {  pathname:'/support/doubtmodule/editquestion',
       state:{question:item},
  }
  )
}
  render(){
    console.log(this.state.question_details);
    var mess=(<p>{this.state.message}</p>);
    var load;
    if(this.state.isloading){
      load=(<p><ReactLoading type="spinningBubbles" color="blue" height="3px" /></p>)
    }
    var questionno;
    if(this.state.question_details.question_number!=""){
      questionno = (<div><label>Question Number: {this.state.question_details.question_number}</label></div>)
    }
    var exerciseno;
    if(this.state.question_details.exercise_number!=""){
      exerciseno = (<div><label>Exercise Number: {this.state.question_details.exercise_number}</label></div>)
    }
    var questiontext;
    if(this.state.question_details.question_text!=""){
      questiontext = (<div><label>Question in Text: {this.state.question_details.question_text}</label></div>)
    }
    var questionimage;
    if(this.state.question_details.question_file!="https://zinedumain.s3.amazonaws.com/null"){
      questionimage = (<div><label>Question in Image: </label><br/><img src={this.state.question_details.question_file} style={{height:'200px', width:'auto'}}/></div>)
    }
    var solutiontext;
    if(this.state.question_details.solution_text!=""){
      solutiontext = (<div><label>Solution in Text: {this.state.question_details.solution_text}</label></div>)
    }
    var solutionimage;
    if(this.state.question_details.solution_image!="https://zinedumain.s3.amazonaws.com/null"){
      solutionimage = (<div><label>Solution in Image: </label><br/><img src={this.state.question_details.solution_image} style={{height:'200px', width:'auto'}}/></div>)
    }
    var solutionvideo;
    if(this.state.question_details.solution_video!="https://zinedumain.s3.amazonaws.com/null"){
      solutionvideo = (<div><label>Solution in Video: </label><br/><ReactPlayer
    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
    onContextMenu={e => e.preventDefault()}
    playing={this.state.playing}
    controls url={this.state.question_details.solution_video} width='100%'/></div>)
    }
  return (
    <div className="container-fluid">
  <div >
      <div className="row">
  <div className="col-md-2">
      </div>
      <div className="col-md-10">

      <br/>
      <h2>Question Details:</h2>
      <br/>
<div class="row">
  <div class="col-md-6">
   {questionno}

  </div>
  <div class="col-md-6">
   {exerciseno}

  </div>
  </div>
  <br/>
  <div class="row">
  <div class="col-md-6">
   {questiontext}

  </div>
  <div class="col-md-6">
   {questionimage}

  </div>
</div>
<br/>
<div class="row">
<div class="col-md-6">
 {solutiontext}

</div>
<div class="col-md-6">
 {solutionimage}

</div>
</div>
          </div>
  </div>

  </div>
    </div>
  );
}
}
export default QuestionDetailsStudentDoubt;
