import {Component} from 'react';
import ReactLoading from 'react-loading';
import Studentnav from './studentnav';

import dateFormat from 'dateformat';


class AssignmentSubmit extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
         let student=data.username;
       this.state={
        id:'',
        assign_file:'',
        assign_icon:'',
        assign_solution:'',
        student:student,
           token:data.token,
            message:'',
            isloading:false,
          }
          this.baseState=this.state;
       }
       onSubmitHandler=(e)=>{
           console.log(this.state)
           this.setState({isloading:true});
       e.preventDefault();
       var formdata = new FormData();

       if(this.state.assign_solution!=''){
        formdata.append('assignment_pdf',this.state.assign_solution)
        formdata.append('assignment',this.state.id);
        formdata.append('student',this.state.student);

        for (var pair of formdata.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); }
       var requestOptions = {
           method: 'POST',
           body: formdata,
           redirect: 'follow',
           headers:{
               'Authorization': 'Token '+ this.state.token
           },
         };
         fetch("https://zinedu-main.herokuapp.com/student/submit-assignment/",requestOptions)
         .then(response => response.json())
         .then(json => {console.log(json);
             if(typeof(json.Error)!='undefined'){
                 alert(json.Error);
                 this.componentDidMount();
         }
         else {
             alert("Assignment Submitted");
              this.props.history.push('/student/assignment');
         }
       })
           .catch(error => { console.log('error', error)
           alert(error);
       });}

       }
       componentDidMount=()=>{
        var formdata = new FormData();
        formdata.append('page_name','student-submitassignment');
       var requestOptions = {
           method: 'POST',
           body: formdata,
           redirect: 'follow',
           headers:{
               'Authorization': 'Token '+ this.state.token
           },
         };
         fetch("https://zinedu-main.herokuapp.com/users/post-analytics/",requestOptions)
         .then(response => response.json())
         .then(json => {console.log(json);
            })
           .catch(error => { 
          this.props.history.push('/error');
       });


         this.setState({ id:this.props.location.state.assignment.id,
                         assign_file:this.props.location.state.assignment.assignment_file,
                         assign_icon:this.props.location.state.assignment.assignment_icon,
                         isloading:false,
                        })
       }

    assignmentchange=(event)=>{
        const file=event.target.files[0];
        console.log(file);
        this.setState({assign_solution:file});
    }
  render(){
    var mess=(<p>{this.state.message}</p>);
    var load;
    if(this.state.isloading){
      load=(<p><ReactLoading type="cylon" color="#09AEE5"  /></p>)
    }

   var h2={
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    // fontSize: '16px',
    // lineHeight: '20px',
    /* identical to box height */
    color: '#000000',
  }
  var form3={
    marginTop:'30px'
}
var form1={
    margin:'30px 0px 30px 0px',
    width:'100%',
    background:'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
    border:'none',
    fontWeight:'bold'
    // textAlign:'center'
  }

  var form2={
    margin:'30px 0px 30px 0px',
    width:'100%',
    background:'linear-gradient(90.18deg, #FEB683 2.43%, #FF8993 99.83%)',
    border:'none',
    fontWeight:'bold'
  }
  return (
      <div>
<Studentnav  history={this.props.history}/>
    <div className="container">
    <h2 style={h2}>Assignment:</h2>
    <form id="registerform" onSubmit={this.onSubmitHandler}>
  <div className="form-group">

      <div className="col-md-12">
      <label style={form3}>Assigment Question :(click on image)</label><br/>
      <a href={this.state.assign_file} target='_blank'> <img src={this.state.assign_icon} alt="assignment Thumbnail" height="200px" width="300px"/></a>

      </div>
      </div>
      <div className="form-group">
      <div className="col-md-12">
      <label style={form3}>Upload Assigment File:</label><br/>
      <input type="file" accept=".pdf,.doc" class="form-control"   onChange={this.assignmentchange} ></input>
      </div>
  </div>

  <div class="form-group">
      <div class="col-md-6">
      {load}
  {mess}

      </div>
  <div class="col-md-3">
 <button style={form1} type="submit" className="btn btn-primary">Submit</button>
 </div>
 <div class="col-md-3">
 <button style={form2} type="button" onClick={()=>{this.props.history.push('/student/assignment')}} className="btn btn-danger">Back</button>
 </div>
 </div>
  </form>
   </div>
   </div>

  );
}
       }
export default AssignmentSubmit;