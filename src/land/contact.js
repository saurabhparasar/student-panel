import {Component} from 'react';
import './land.css';
class Contact extends Component {
  constructor(){   
    super();
    
   this.state={
       name:'',    
       email:'',
       mobileno:'',
       subject:'',
       message:'',
       res:'',
  }}
  onSubmitHandler=(e)=>{
    e.preventDefault();
  var formdata = new FormData();
    formdata.append("subject", this.state.subject);
    formdata.append("message", this.state.message);
    formdata.append("name", this.state.name);
    formdata.append("email", this.state.email);
    formdata.append("mobile_number", this.state.mobileno);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      console.log(this.state);
      fetch("https://zinedu-main.herokuapp.com/contact-us/",requestOptions)
      .then(response => {if(response.status===200){
          this.setState({res:"We like you messaged, Will get back to you Soon !!"})
      }
    })
        .catch(error => console.log('error', error));
        document.getElementById("registerform").reset();
} 

  namechange=(event)=>{
    let variable = event.target.value;
                this.setState({
                        name:variable,
                    });
    }
  numberchange=(event)=>{
      let variable = event.target.value;
                  this.setState({
                          mobileno:variable,
                      });
  }
  emailchange=(event)=>{
      let variable = event.target.value;
                  this.setState({
                          email:variable,
                      });
  }
  subjectchange=(event)=>{
    let variable = event.target.value;
                this.setState({
                        subject:variable,
                    });
  }
  messagechange=(event)=>{
    let variable = event.target.value;
                this.setState({
                        message:variable,
                    });
  }
  render(){
    var res=(<p>{this.state.res}</p>);
  return (
    <div className="contact">
  <div className="container">
    <p id="text1">GET IN TOUCH</p>
    <p id="text2">Contact Us Now</p>
<center>
    <form id="registerform" onSubmit={this.onSubmitHandler} className="form-horizontal">
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="Name" onChange={this.namechange} required/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input type="tel" className="form-control" placeholder="ContactNumber" pattern="[0-9]{10}" onChange={this.numberchange} required/>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <div className="col-sm-10">
            <input type="email" className="form-control" placeholder="Email"  onChange={this.emailchange}  required/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="Subject" onChange={this.subjectchange} required/>
          </div>
        </div>
      </div>
    </div>
    <textarea id="textarea" className="form-control" placeholder="Message" onChange={this.messagechange} required></textarea>
    <br/>
        <button type="submit" className="btn btn-info">SEND</button>
  </form>
  {res}
</center>
  </div>
</div>
  );
}
}
export default Contact;

