import {Component} from 'react';
import ObjectiveResultSideNav from './SideNav.js';
import Styles from './sidenav.module.css';
import axios from 'axios';
import Config from '../../config.json';

class DifficultyLevelWiseScore extends Component{
  constructor(){
    super();
    let data=localStorage.getItem("userdetail");

    data= JSON.parse(data);
     let student=data.username;
   this.state={
       token:data.token,
       student:student,
       isloading:false,
       result:'',
       exam_id:'',
       questions:'',
       }

}
componentDidMount=()=>{
  console.log(this.props);
  var requestOptions = {
    redirect: 'follow',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token
    },
  };
  axios.get(Config.SERVER_URL+'student/get-student-objective-alloted-questions/?student='+this.state.student+'&exam='+this.props.location.state.exam_id,requestOptions)
  .then(response =>{console.log(response.data)
    const cls=response.data;
    this.setState({
      questions:cls,
      isloading:false,
    });
  })
  .catch(error => {
    this.props.history.push('/error');
  });
}
  render(){
    if(this.state.questions){

    var correct1 = 0;
    var incorrect1 = 0;
    var notans1 = 0;
    var correct2 = 0;
    var incorrect2 = 0;
    var notans2 = 0;
    var correct3 = 0;
    var incorrect3 = 0;
    var notans3 = 0;


    {this.state.questions.map((item)=>{if(item.question_assoc.difficulty_level==1){if(item.ans_given==0){
    notans1 = notans1 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="No"){
      incorrect1 = incorrect1 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="Yes"){
      correct1 = correct1 + 1;
    }
  }
  else if(item.question_assoc.difficulty_level==2){
    if(item.ans_given==0){
    notans2 = notans2 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="No"){
      incorrect2 = incorrect2 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="Yes"){
      correct2 = correct2 + 1;
    }
  }
  else if(item.question_assoc.difficulty_level==3){
    if(item.ans_given==0){
    notans3 = notans3 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="No"){
      incorrect3 = incorrect3 + 1;
    }
    else if(item.ans_given!=0 && item.is_correct=="Yes"){
      correct3 = correct3 + 1;
    }
  }
}
)}
  var percentcorrect1 = Math.floor(correct1/this.state.questions.length * 100);
  var percentincorrect1 = Math.floor(incorrect1/this.state.questions.length * 100);
  var percentnotans1 = Math.floor(notans1/this.state.questions.length * 100);
  var percentcorrect2 = Math.floor(correct2/this.state.questions.length * 100);
  var percentincorrect2 = Math.floor(incorrect2/this.state.questions.length * 100);
  var percentnotans2 = Math.floor(notans2/this.state.questions.length * 100);
  var percentcorrect3 = Math.floor(correct3/this.state.questions.length * 100);
  var percentincorrect3 = Math.floor(incorrect3/this.state.questions.length * 100);
  var percentnotans3 = Math.floor(notans3/this.state.questions.length * 100);
var linecorrect1;
var lineincorrect1;
var linenotans1;
var linecorrect2;
var lineincorrect2;
var linenotans2;
var linecorrect3;
var lineincorrect3;
var linenotans3;

var totalquestions1 = (<div style={{margin:'0px 0 35px 0'}}><p style={{float:'right', fontSize:'15px', fontFamily:'Montserrat', fontWeight:'bold', color:'grey'}}>{correct1 + incorrect1 + notans1}</p></div>)
var totalquestions2 = (<div style={{margin:'0px 0 35px 0'}}><p style={{float:'right', fontSize:'15px', fontFamily:'Montserrat', fontWeight:'bold', color:'grey'}}>{correct2 + incorrect2 + notans2}</p></div>)
var totalquestions3 = (<div style={{margin:'0px 0 35px 0'}}><p style={{float:'right', fontSize:'15px', fontFamily:'Montserrat', fontWeight:'bold', color:'grey'}}>{correct3 + incorrect3 + notans3}</p></div>)


linecorrect1 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentcorrect1, background:'#0F9F6A', fontSize:'12px'}}>
      {correct1}
    </div>
  </div>  <p style={{color:'#0F9F6A', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Correct : <span style={{float:'right'}}>{correct1}</span></p></div>)
lineincorrect1 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentincorrect1, background:'#FF583D', fontSize:'12px'}}>
      {incorrect1}
    </div>
  </div><p style={{color:'#FF583D', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Incorrect : <span style={{float:'right'}}>{incorrect1}</span></p></div>)
linenotans1 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentnotans1, background:'#A8A8A8', fontSize:'12px'}}>
      {notans1}
    </div>
  </div>
  <p style={{color:'#A8A8A8', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Not Answered : <span style={{float:'right'}}>{notans1}</span></p></div>)
  linecorrect2 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
      <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentcorrect2, background:'#0F9F6A', fontSize:'12px'}}>
        {correct2}
      </div>
    </div>  <p style={{color:'#0F9F6A', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Correct : <span style={{float:'right'}}>{correct2}</span></p></div>)
  lineincorrect2 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
      <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentincorrect2, background:'#FF583D', fontSize:'12px'}}>
        {incorrect2}
      </div>
    </div><p style={{color:'#FF583D', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Incorrect : <span style={{float:'right'}}>{incorrect2}</span></p></div>)
  linenotans2 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
      <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentnotans2, background:'#A8A8A8', fontSize:'12px'}}>
        {notans2}
      </div>
    </div>
    <p style={{color:'#A8A8A8', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Not Answered : <span style={{float:'right'}}>{notans3}</span></p></div>)
    linecorrect3 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentcorrect3, background:'#0F9F6A', fontSize:'12px'}}>
          {correct3}
        </div>
      </div>  <p style={{color:'#0F9F6A', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Correct : <span style={{float:'right'}}>{correct3}</span></p></div>)
    lineincorrect3 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentincorrect3, background:'#FF583D', fontSize:'12px'}}>
          {incorrect3}
        </div>
      </div><p style={{color:'#FF583D', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Incorrect : <span style={{float:'right'}}>{incorrect3}</span></p></div>)
    linenotans3 = (<div><div class="progress" style={{margin:'0px', height:'17px'}}>
        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:percentnotans3, background:'#A8A8A8', fontSize:'12px'}}>
          {notans3}
        </div>
      </div>
      <p style={{color:'#A8A8A8', fontSize:'10px', fontFamily:'Montserrat', textAlign:'left'}}>Not Answered : <span style={{float:'right'}}>{notans3}</span></p></div>)



}

    var gap2={
        margin:'0px',
        padding:'0px',
    }
    var nav={
       border:'none',
       width:'100%',
       boxShadow: '1px 2px 5px lightgrey',
    }
    var title={
       display: 'inline-block',
     }
    var icons={
       display: 'inline-block',
       float: 'right',
       padding:' 2px 10px 0px 0px',
     }
     var i={
       fontSize: '25px',
       margin: '0px 10px 0px 0px',
       }
    var text2={
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
     var img3={
       marginTop: "5px",
       }
     var spacing={
         margin:'50px 20px 0px 20px'
     }
     var h2={
       fontFamily: 'Montserrat',
       fontStyle: 'normal',
       fontWeight: '500',
       color: '#000000',
     }
     var form={
         margin:'30px 0px 20px 0px'

     }
     var form3={
       marginTop:'30px'
   }
   var form1={
       marginTop:'30px',
       width:'100%',
   }
   var loader={
     marginTop:'15px'
   }
    return(
      <div>
      <div class="container-fluid">
      <div class="row">
      <div class="col-md-3">
      <ObjectiveResultSideNav exam_id={this.props.location.state.exam_id}/>
      </div>

      <div class="col-md-9" style={{padding:'0px'}}>
      <nav id={Styles.nav}>
          <div style={title}>
            <p style={text2}>Difficulty Level Wise Score</p>
          </div>
          <div style={icons}>
            <i style={i} class="fas fa-bell"></i>
            <svg style={img3} width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z" fill="#E8E8E8"/>
  <path d="M31.0871 28.5241C29.4473 30.5468 27.3766 32.1779 25.0261 33.2983C22.6755 34.4187 20.1045 35.0002 17.5006 35.0002C14.8967 35.0002 12.3256 34.4187 9.97507 33.2983C7.62453 32.1779 5.55382 30.5468 3.91406 28.5241C6.11938 25.8293 9.16783 23.9557 12.5681 23.2051C12.5002 24.6394 12.7544 26.0708 13.3121 27.3941C14.2771 25.1941 17.5011 24.9941 17.5011 24.9941C17.5011 24.9941 20.7251 25.1871 21.6621 27.3941C22.234 26.0751 22.4888 24.6404 22.4061 23.2051C25.3001 23.9491 28.8271 25.4651 31.0871 28.5241Z" fill="#029EDC"/>
  <path d="M21.442 21.496C21.442 21.496 21.635 23.48 17.501 25.024C17.501 25.024 20.725 25.217 21.662 27.424C21.718 27.476 23.564 22.681 21.442 21.496Z" fill="#0061B5"/>
  <path d="M13.559 21.496C11.437 22.681 13.283 27.476 13.339 27.396C14.304 25.196 17.5 24.996 17.5 24.996C13.366 23.48 13.559 21.496 13.559 21.496Z" fill="#0061B5"/>
  <path d="M20.5042 4.87805C20.7242 2.34305 16.7041 2.50805 16.7041 2.50805C15.0175 2.71576 13.445 3.46902 12.2261 4.65309C11.0072 5.83717 10.2087 7.38718 9.95215 9.06705L10.7791 8.07505C9.47914 10.9141 11.4402 15.792 11.6062 16.175C12.6262 19.565 14.8861 22.675 17.5061 22.675C20.1261 22.675 22.3841 19.561 23.4061 16.175V16.147C23.5161 15.734 23.6261 15.3201 23.7061 14.9071H23.6781C24.2291 12.7071 24.8351 10.4701 24.8351 10.4701C26.4021 2.56305 20.5042 4.87805 20.5042 4.87805ZM23.2872 14.5241C23.0607 16.2353 22.2762 17.824 21.0551 19.044C20.821 19.2711 20.5725 19.4829 20.3111 19.6781L19.8701 18.3H15.1301L14.6891 19.7061C13.8071 19.0451 11.9612 17.1981 11.9332 15.4621C11.1612 5.56805 18.7401 7.66205 18.7401 7.66205C23.8391 7.27605 23.6731 11.7681 23.2881 14.5241H23.2872Z" fill="#029EDC"/>
  <path d="M15.571 19.2361C15.8125 19.5104 16.1091 19.7307 16.4415 19.8827C16.7739 20.0347 17.1346 20.1149 17.5 20.1181C17.8665 20.1209 18.2291 20.0434 18.5624 19.891C18.8956 19.7386 19.1915 19.5151 19.429 19.2361H15.571Z" fill="white"/>
  </svg>
          </div>
        </nav>
        <div class="gap" style={{marginTop:'100px'}}>
        <div class="col-sm-4" style={{marginBottom:'30px'}}>
        <div class="box" style={{boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.19)', borderRadius:'14px'}}>
        <div style={{borderBottom:'1px solid #E7E7E7', padding:'20px 0 10px 30px'}}>
        <span style={{fontSize:'16px', fontFamily:'Montserrat'}}>Easy</span>
        </div>
        <center>
        <div style={{padding:'20px 30px 20px 10px', marginTop:'0px'}}>
        {totalquestions1}

        {linecorrect1}

        {lineincorrect1}

        {linenotans1}
        </div>

</center>
        </div>
        </div>
        <div class="col-sm-4"  style={{marginBottom:'30px'}}>
        <div class="box" style={{boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.19)', borderRadius:'14px'}}>
        <div style={{borderBottom:'1px solid #E7E7E7', padding:'20px 0 10px 30px'}}>
<span style={{fontSize:'16px', fontFamily:'Montserrat'}}>Medium</span>
        </div>
        <center>
        <div style={{padding:'20px 30px 20px 10px', marginTop:'0px'}}>
        {totalquestions2}

        {linecorrect2}

        {lineincorrect2}

        {linenotans2}
        </div>
</center>
        </div>
        </div>
        <div class="col-sm-4"  style={{marginBottom:'30px'}}>
        <div class="box" style={{boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.19)', borderRadius:'14px'}}>
        <div style={{borderBottom:'1px solid #E7E7E7', padding:'20px 0 10px 30px'}}>
<span style={{fontSize:'16px', fontFamily:'Montserrat'}}>Hard</span>
        </div>
        <center>
        <div style={{padding:'20px 30px 20px 10px', marginTop:'0px'}}>
        {totalquestions3}

        {linecorrect3}

        {lineincorrect3}

        {linenotans3}
        </div>
</center>
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
export default DifficultyLevelWiseScore;
