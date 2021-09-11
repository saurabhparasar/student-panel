import {Component} from 'react';
import ReactLoading from 'react-loading';
import styles from '../landing/login.module.css';
class ResetPassword extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
        this.state={
            current_password:'',
            new_password:'',
            confirm_password:'',
            token:data.token,
            iserror:false,
            message:'',
            isloading:false,
        }
    }
    componentDidMount=()=>{
        var formdata = new FormData();
        formdata.append('page_name','Student-resetpassword');
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

    }
    
    onSubmithandler=(e)=>
    {   this.setState({isloading:true});
        e.preventDefault();
        var formdata = new FormData();
        formdata.append('old_password',this.state.current_password);
        formdata.append('new_password',this.state.new_password);
        formdata.append('confirm_password',this.state.confirm_password);
        
       var requestOptions = {
           method: 'POST',
           body: formdata,
           redirect: 'follow',
           headers:{
               'Authorization': 'Token '+ this.state.token
           },
         };
         fetch("https://zinedu-main.herokuapp.com/users/change-password/",requestOptions)
         .then(response => response.json())
         .then(json => {console.log(json);
            if(typeof(json.Error)=='undefined'){
                localStorage.clear();
                this.props.history.push('/');
        }
        else {
           this.setState({
               iserror:true,
               message:json.Error,
               isloading:false,
           });
        }
            })
           .catch(error => { 
          this.props.history.push('/error');
       });

    }
    
    oncurrentpasswordchange=(e)=>{
        let variable=e.target.value;
        this.setState({
            current_password:variable
        })
    }
    onnewpasswordchange=(e)=>{
        let variable=e.target.value;
        this.setState({
            new_password:variable
        })
    }
    onconfirmpasswordchange=(e)=>{
        let variable=e.target.value;
        this.setState({
            confirm_password:variable
        })
    }
    
  
  render(){
      var error;
    if(this.state.iserror){
        error=(<p id={styles.error}>{this.state.message}</p>);
    }
     var load;
     if(this.state.isloading){
       load=(<p><ReactLoading type="cylon" color="#09AEE5"  /></p>)
     }
  return (
    <section className={styles.login}>
<div class="container">
  <center>
  <div className={styles.box}>
  
    <div class="row">
      <div class="col-sm-5">
        <svg id={styles.img1} width="125" height="98" viewBox="0 0 125 98" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M62.7178 26.6128L19.438 14.0373L62.7178 0L105.998 14.0373L102.008 14.8262C102.008 18.5385 102.008 22.2508 102.008 25.94C103.524 26.52 104.598 27.7265 104.598 29.6987C104.598 31.6709 102.778 33.7127 100.561 33.7127C98.3216 33.7127 96.5251 31.6709 96.5251 29.6987C96.5251 27.7265 97.5983 26.52 99.1382 25.94C99.1382 22.4597 99.1382 18.9561 99.1382 15.4758L62.7178 26.6128Z" fill="#2B337A"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M43.4972 43.8112L60.6033 49.0742V54.5479L35.0607 46.6649V41.2147L52.5164 35.2733L35.0607 29.8932V24.4196L60.6033 32.3026V32.5131V37.7528V37.9867L43.4972 43.8112ZM65.2877 49.0742L90.8304 40.7703V46.2439L65.2877 54.5479V49.0742ZM65.2877 32.2792L90.8304 23.9752V29.4488L65.2877 37.7528V32.2792ZM65.2877 40.6767V46.1503L84.3282 39.9516V34.4779L65.2877 40.6767ZM63.0271 58.3139L93.697 48.3491C93.697 32.7236 93.697 38.8522 93.697 20.0454L62.9805 30.0336L32.1941 20.5366C32.1941 39.6709 32.1941 30.8757 32.1941 48.7936L63.0271 58.3139Z" fill="#029EDC"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M47.5501 78.6362C44.4252 78.6827 42.0287 79.8437 40.666 82.3516V78.7988H35.9905V97.7705H40.666V88.4355C40.666 85.3239 42.5221 83.0018 45.694 82.9786C48.3489 82.9786 49.9701 84.6041 49.9701 87.2745V97.7705H54.6691V85.9277C54.6456 81.4228 51.9672 78.6362 47.5501 78.6362Z" fill="#029EDC"/>
  <path d="M30.068 78.6362H25.5122V97.7705H30.068V78.6362Z" fill="#029EDC"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M28.0179 70.8914C26.5426 70.8914 25.5122 71.9392 25.5122 73.397C25.5122 74.8549 26.5426 75.9027 28.0179 75.9027C29.4932 75.9027 30.5236 74.8549 30.5236 73.397C30.5236 71.9392 29.4698 70.8914 28.0179 70.8914Z" fill="#029EDC"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M0.468536 72.7136L0.445115 76.9054H14.7589L0 94.3514V97.7704H21.4121V93.5786H6.48925L21.2247 76.0858V72.7136H0.468536Z" fill="#2B337A"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M120.295 78.1807V87.75C120.295 90.8606 118.564 93.2589 115.625 93.3064C113.12 93.3064 111.616 91.668 111.616 88.961V78.1807H107.061V90.3382C107.061 94.921 109.635 97.7705 113.803 97.7705C116.764 97.7705 118.997 96.5832 120.272 93.995V97.5805H124.828V78.1807H120.295Z" fill="#029EDC"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M96.9768 70.9149V81.5114C95.5847 79.3498 93.4039 78.175 90.4806 78.175C85.1676 78.175 81.5483 82.0988 81.5483 87.9022C81.5483 93.7526 85.1676 97.7704 90.5966 97.7704C93.4271 97.7704 95.6312 96.5956 96.9768 94.4575V97.5354H101.594V70.8914H96.9768V70.9149ZM91.5942 93.8466C88.3926 93.8466 86.2349 91.4501 86.2117 87.9962C86.2581 84.5893 88.439 82.1458 91.5942 82.1458C94.7959 82.1458 96.9768 84.5423 96.9768 87.9962C96.9768 91.4266 94.7727 93.8466 91.5942 93.8466Z" fill="#029EDC"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M59.6807 93.2146V97.3148H78.3593V93.2146H64.4551H59.6807Z" fill="#2B337A"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M59.6807 82.7363V86.8136H66.6653V86.8365H76.537V82.7363H64.4535H59.6807Z" fill="#2B337A"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M59.6807 72.2581V76.8138H64.4456H66.6538H77.9037V72.2581H59.6807Z" fill="#2B337A"/>
  </svg>
      </div>
      <div class="col-sm-7" id={styles.formcon}>
        <p id={styles.text1}>Reset Password</p>
        <p id={styles.text2}>Enter Details</p>
        <form class="form-horizontal" onSubmit={this.onSubmithandler}>

            <div class="form-group" >
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Current Password" name="useraname" onChange={this.oncurrentpasswordchange} required/>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="New Password" name="password"  onChange={this.onnewpasswordchange} required/>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Confirm Password" name="password"  onChange={this.onconfirmpasswordchange} required/>
              </div>
            </div>
            {error}
            <div className="form-group">
            <div className="col-sm-6">
            {load}
                </div>
                <div className="col-sm-6">
                <p id={styles.text3} onClick={this.forgothandler}> Forgot Password?</p>
              </div>
            </div>
           
  
            <center>
            <button type="submit" class="btn btn-info">Submit</button>
          </center>
      </form>
      </div>
    </div>
  </div>
</center>
</div>
  </section>
     
  );
}
}
export default ResetPassword;
