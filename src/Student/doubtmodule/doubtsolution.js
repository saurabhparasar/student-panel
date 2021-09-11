import {Component} from 'react';
import ReactPlayer from 'react-player';
import Studentnav from '../studentnav';
import Config from '../../config.json';
import Style from './doubt.module.css';

class DoubtSolution extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
         let studentname=data.username;
       this.state={
           token:data.token,
           student:studentname,
            question:'',
            solutions:[],
            selectedquestion:'',
            solution_text:'',
            solution_image:'',
            solution_video:'',
            question_file:'',
            search_type:'',
            query_id:'',
            playing:false,
           isloading:false,

        }
    }
  Logout=() =>{
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount=()=>{
      let ques=this.props.location.state.question;
      let sol=this.props.location.state.solutions.data;
      let type = this.props.location.state.search_type;

      if(type=="image"){
        const url=URL.createObjectURL(ques);
        this.setState({
          question:url,
          solutions:sol,
          search_type:type,
          query_id:this.props.location.state.solutions.id,

        });
      }
      else if(type=="text"){
        this.setState({
          question:ques,
          solutions:sol,
          search_type:type,
          query_id:this.props.location.state.solutions.id,

        });
      }
  }
  selectedOption=(item)=>{
      this.setState({
        solution_text:item.solution_text,
        solution_image:item.solution_image,
        solution_video:item.solution_video,

      })
  }
  onBackClick=()=>{
    this.props.history.push('/student/doubtmodule/uploaddoubt')
  }
onDislike=()=>{
  if(window.confirm('Are you sure you dont like the solution')){
    var formdata = new FormData();
    formdata.append("student_query_id", this.state.query_id);
    var requestOptions={
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers:{
          'Authorization': 'Token '+ this.state.token
      },
    }
    fetch(Config.SERVER_URL+'student/post-pending-doubt/', requestOptions)
    .then(response => response.json())
    .then(data => {console.log(data)
      alert('We will contact you in 5-6 hours with a solution');
    })
    .catch(error => {
        this.props.history.push('/error');
     });
  }
}
onFeedback=(event)=>{
  let variable = event.target.value;
  console.log(variable);
  var formdata = new FormData();
  formdata.append("rating", variable);
  var requestOptions={
    method: 'PUT',
    body: formdata,
    redirect: 'follow',
    headers:{
        'Authorization': 'Token '+ this.state.token
    },
  }
  fetch(Config.SERVER_URL+'student/update-student-query/'+this.state.query_id+'/', requestOptions)
  .then(response => response.json())
  .then(data => {console.log(data)
    alert('Thank you for giving us '+ variable + ' star rating');
  })
  .catch(error => {
      this.props.history.push('/error');
   });
}
  render(){
    var text1={
      fontFamily:'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#292E42',
    }
    var btn1={
      background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
      border: 'none',
      margin: '10px',
      padding: '10px',
      borderRadius: '5px',
      fontWeight: 'bold',
      width:'200px',
      color:'white',
    }
    var btn2={
      background: 'linear-gradient(90.18deg, #FEB683 2.43%, #FF8993 99.83%)',
      border: 'none',
      marginTop: '50px',
      padding: '10px',
      borderRadius: '5px',
      fontWeight: 'bold',
      width:'100%',
      color:'white',
    }
  return (
    <div>
    <Studentnav/>
    <div class="container" style={{marginTop:'40px'}}>
    <div class="row">
    <div class="col-sm-7">
        <p style={text1}>Results matching your doubt</p>
        <br/>
  {/*    {this.state.search_type=="image"?(<div>
        <img src={this.state.question} alt="question image" />
        </div>):<div><p>{this.state.question}</p></div>}*/}
     </div>
     <div class="col-md-5">
     <button onClick={this.onDislike} style={{fontFamily:'Montserrat', fontSize:'18px', color:'#EB7926', border:'none', background:'none', float:'right'}}><svg style={{margin:'-3px 5px'}} width="18" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0401 0H3.95986C1.77275 0 0 1.69104 0 3.78415V21.1004C0 21.8351 0.881601 22.2647 1.50376 21.8189L5.27981 19.1125H16.0401C18.2273 19.1125 20 17.4215 20 15.3284V3.78415C20 1.69408 18.2304 0 16.0401 0ZM9.06003 14.3025H4.96653C4.44741 14.3025 4.02668 13.9005 4.02668 13.4044C4.02668 12.9083 4.44741 12.5062 4.96653 12.5062H9.06003C9.57915 12.5062 9.99988 12.9083 9.99988 13.4044C9.99988 13.9005 9.57915 14.3025 9.06003 14.3025ZM15.0335 10.4545H4.96653C4.44741 10.4545 4.02668 10.0522 4.02668 9.55639C4.02668 9.0603 4.44741 8.65824 4.96653 8.65824H15.0335C15.5523 8.65824 15.9733 9.0603 15.9733 9.55639C15.9733 10.0522 15.5526 10.4545 15.0335 10.4545ZM15.0335 6.6063H4.96653C4.44741 6.6063 4.02668 6.20424 4.02668 5.70815C4.02668 5.2123 4.44741 4.81 4.96653 4.81H15.0335C15.5523 4.81 15.9733 5.2123 15.9733 5.70815C15.9733 6.20424 15.5526 6.6063 15.0335 6.6063Z" fill="#EB7926"/>
</svg>
Request Another Solution</button>
    {/* <button onClick={this.onBackClick} style={btn2}>Back</button><br/><br/>
      <p>Rate The Solution</p>
      <form class={Style.rating} onChange={this.onFeedback}>
  <label>
    <input type="radio" name="stars" value="1" />
    <span class={Style.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="2" />
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="3" />
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="4" />
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="5" />
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
    <span class={Style.icon}>★</span>
  </label>
</form>*/}
     </div>
     </div>
     <div class="row">
      <div class="col-md-12">
        {console.log(this.state.solutions.length)}
     {this.state.solutions.length==0?(<div style={text1}>No Solution Available</div>):this.state.solutions.map((item)=>{return <div style={{ marginTop:'30px', padding:'20px', borderRadius:'24px', background:'#EEEEEE', overflow:'auto'}} key={item.id}><p style={{fontFamily:'Montserrat', fontWeight:'bold', color:'#1C3687', fontSize:'15px'}}><svg style={{margin:'0px 4px 0px 0px'}} width="12" height="15" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.150825 3.94793C-0.0132227 4.74131 0.651628 5.41958 1.46152 5.44089C2.2752 5.46231 2.94209 4.77841 3.38424 4.09501C3.74893 3.53136 4.40733 3.00995 5.59529 3.00995C6.94588 3.00995 7.60188 3.93607 7.872 4.59207C8.18071 5.36384 8.06495 6.25137 7.60189 6.98455C7.52575 7.09877 7.4381 7.21146 7.3382 7.31958C6.06045 8.70254 3.92408 9.84073 3.86937 11.7228L3.82439 13.2701C3.80079 14.0817 4.44082 14.7582 5.25249 14.7795C6.06065 14.8008 6.73377 14.1644 6.75777 13.3563L6.77942 12.6273C6.80926 11.6231 7.53286 10.7682 8.3911 10.2459C9.57376 9.52618 11.0073 8.11366 11.0748 5.47961C11.1906 1.15771 7.33176 0.0386429 5.71105 5.43594e-05C4.5341 5.43594e-05 0.935012 0.15532 0.150825 3.94793Z" fill="#EB7926"/>
<path d="M5.31183 16.1844L5.11897 16.1791C4.35206 16.1579 3.71318 16.7625 3.692 17.5294C3.67082 18.2963 4.27536 18.9352 5.04227 18.9563L5.23513 18.9617C6.00205 18.9829 6.64093 18.3783 6.66211 17.6114C6.68329 16.8445 6.07875 16.2056 5.31183 16.1844Z" fill="#EB7926"/>
</svg>Question</p><img style={{marginLeft:'30px', maxHeight:'500px', paddingRight:'20px', maxWidth:'800px'}} src={item.question_file} alt="question" width="auto" height="auto"/>
<p style={{fontFamily:'Montserrat', fontWeight:'bold', color:'#1C3687', fontSize:'17px', marginTop:'30px'}}><svg style={{margin:'0px 4px 0px 0px'}} width="28" height="23" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5889 13.4086C22.5889 8.67278 18.736 4.81982 14.0001 4.81982C9.26417 4.81982 5.41132 8.67278 5.41132 13.4086C5.41132 16.3129 6.89412 19.0273 9.31175 20.6059V23.3117C9.31175 25.8968 11.4149 27.9999 14 27.9999C16.585 27.9999 18.6882 25.8968 18.6882 23.3117V21.792C18.6882 21.7916 18.6881 20.606 18.6881 20.606C21.106 19.0274 22.5889 16.313 22.5889 13.4086ZM17.0325 23.3118C17.0325 24.9839 15.6722 26.3442 14.0001 26.3442C12.3279 26.3442 10.9676 24.9839 10.9676 23.3118V22.6198H17.0325V23.3118ZM17.448 19.425C17.191 19.5726 17.0325 19.8464 17.0325 20.1429V20.9641H14.8279V16.6832C15.9028 16.3335 16.6822 15.3225 16.6822 14.1324C16.6822 13.6752 16.3115 13.3045 15.8544 13.3045C15.3972 13.3045 15.0265 13.6752 15.0265 14.1324C15.0265 14.6983 14.566 15.1588 14.0001 15.1588C13.4341 15.1588 12.9736 14.6984 12.9736 14.1324C12.9736 13.6752 12.6029 13.3045 12.1457 13.3045C11.6885 13.3045 11.3179 13.6752 11.3179 14.1324C11.3179 15.3224 12.0972 16.3335 13.1722 16.6832V20.9641H10.9677V20.1428C10.9677 19.8464 10.8093 19.5726 10.5522 19.425C8.40251 18.19 7.06715 15.8847 7.06715 13.4086C7.06715 9.58574 10.1773 6.47555 14.0002 6.47555C17.8232 6.47555 20.9333 9.58568 20.9333 13.4086C20.9332 15.8847 19.5977 18.1901 17.448 19.425Z" fill="#EA7A26"/>
<path d="M13.9999 0C13.5427 0 13.1721 0.370673 13.1721 0.827861V2.28118C13.1721 2.73837 13.5427 3.10905 13.9999 3.10905C14.4571 3.10905 14.8278 2.73837 14.8278 2.28118V0.827861C14.8278 0.370673 14.4572 0 13.9999 0Z" fill="#EA7A26"/>
<path d="M11.6712 2.49377L11.1574 1.13424C10.9957 0.706579 10.5178 0.490946 10.0903 0.652548C9.66266 0.814204 9.44697 1.29195 9.60862 1.71961L10.1224 3.07915C10.2476 3.41044 10.5625 3.61454 10.897 3.61454C10.9942 3.61454 11.0932 3.59726 11.1895 3.56083C11.6172 3.39918 11.8329 2.92143 11.6712 2.49377Z" fill="#EA7A26"/>
<path d="M17.9095 0.652585C17.4818 0.490874 17.0041 0.706671 16.8425 1.13433L16.3286 2.49386C16.167 2.92146 16.3827 3.39922 16.8104 3.56087C16.9067 3.59729 17.0057 3.61457 17.1029 3.61457C17.4374 3.61457 17.7523 3.41048 17.8774 3.07918L18.3913 1.71965C18.5529 1.29194 18.3372 0.814241 17.9095 0.652585Z" fill="#EA7A26"/>
</svg>Solution</p>
    {item.solution_image!=null?(<div><img style={{marginLeft:'30px', maxHeight:'500px', paddingRight:'20px', maxWidth:'800px'}} src={item.solution_image} alt="question" width="auto" height="auto"/></div>):(<div></div>)}
<div class="row" style={{marginTop:'15px'}}>
<div class="col-sm-5">
    {item.solution_text!=null?(<button style={{ border:'none', width:'80%', padding:'10px', background: '#EA7A26', borderRadius:'26px', marginLeft:'30px', color:'white', fontWeight:'bold', fontFamily:'Montserrat', fontSize:'16px', marginBottom:'10px'}} data-toggle="modal" data-target="#answer_text" onClick={()=>this.selectedOption(item)}>Text Solution</button>):(<div></div>)}
</div>
<div class="col-sm-5">
    {item.solution_video!=null?(<button style={{ border:'none', width:'80%', padding:'10px', background: '#EA7A26', borderRadius:'26px', marginLeft:'30px', color:'white', fontWeight:'bold', fontFamily:'Montserrat', fontSize:'16px'}} data-toggle="modal" data-target="#answer_video" onClick={()=>this.selectedOption(item)}>Video Solution</button>):(<div></div>)}
    </div>
    </div>

    </div>})}
    </div>
</div>
    <div id="answer_text" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Answer text: </h4>
      </div>
      <div class="modal-body">

      <p>{this.state.solution_text}</p>
      </div>
    </div>
  </div>
</div>
<div id="answer_image" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Answer Image: </h4>

      </div>
      <div class="modal-body">
       <img src={this.state.solution_image} alt="solution image" width="100%" height="100%"/>
      </div>
    </div>
  </div>
</div>
<div id="answer_video" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" onClick={()=>{this.setState({solution_video:null})}} data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Answer Video: </h4>
      </div>
      <div class="modal-body">

      <ReactPlayer
    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
    onContextMenu={e => e.preventDefault()}
    playing={this.state.playing}
    controls url={this.state.solution_video} width='100%'/>
      </div>
    </div>
  </div>
</div>
</div>
<br/>
    </div>
  );
}
}
export default DoubtSolution;
