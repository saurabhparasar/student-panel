import {Component} from 'react';
import Navcomp from '../nav';
import axios from 'axios';
import Styles from './studentnav.module.css';
import ReactLoading from 'react-loading';
class Installment extends Component {
  constructor(){
    super();
    let data=localStorage.getItem("userdetail");
    data= JSON.parse(data);
     let studentname=data.username;
   this.state={
     student:studentname,
     installment:[],
     isloading:false,
     studentdetail:'',
     payment:'',
     token:data.token,
   }
   this.baseState = this.state
}

onPayNowClick=(item)=>{
  this.props.history.push(
    {
      pathname: '/school/payment/paynow',
      state: {payment:item,
               student:this.state.studentdetail}
    });
}
Logout=() =>{
  localStorage.clear();
  this.props.history.push('/');
}
componentDidMount=()=>{
  var formdata = new FormData();
  formdata.append('page_name','student-payment-installment');
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

  this.setState({
      payment:this.props.location.state.payment,
      studentdetail:this.props.location.state.student,
      isloading:true,
  })
  let id=this.props.location.state.payment.id;
  var requestOptions = {
    redirect: 'follow',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token
    },
  };
  var school;
  axios.get('https://zinedu-main.herokuapp.com/payment/get-installment-details/?section='+id,requestOptions)
  .then(response =>{console.log(response.data)
      const pack=response.data;
     
      this.setState({
           installment:pack,
          isloading:false,
      });
      
  });


}
  render(){
   
    var load;
    if(this.state.isloading){
      load=(<p><ReactLoading type="cylon" color="#09AEE5"/></p>);
    }
    var h2={
      width:'200px',
      background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#ffffff',
        marginTop:'50px',
        fontSize: '15px',
        lineHeight: '18px',
        borderRadius: '37px',
        // margin:'50px 200px 0px 200px',
        textAlign:'center',
        padding:'10px',
      }
      var text1={
        marginTop:'20px',
        fontFamily: 'Montserrat',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '15px',
lineHeight: '18px',
color: '#000000'
      }
      var box={
        justifyContent:'center',
        alignItems:'center',
        borderRadius: '5px',
        padding: '10px',
        minHeight: '175px',
        background:'linear-gradient(90.18deg, #9EC8FF 2.43%, #00AEEF 99.83%)',
        margin:'20px',
        textAlign:'center',
      }
      var column={
        float: 'left',
        width: '33.33%',

      }
    var card1=this.state.installment.map((item) => (<div style={column}><div class={Styles.box1}><div key={item.id}><h1 > &#x20b9; {item.fee_amount}</h1><br/><p style={{fontFamily: 'Montserrat',fontStyle: 'normal',fontWeight: 'normal',fontSize: '15px',lineHeight: '191.6%', textAlign: 'center' ,color: '#000000'}}>{item.desc}</p><br/><p style={{fontFamily: 'Montserrat',fontStyle: 'normal',fontWeight: 'normal',fontSize: '20px',lineHeight: '191.6%', textAlign: 'center' ,color: '#000000'}}>{item.validity} month</p><button id={Styles.btn3} onClick={()=>{this.onPayNowClick(item)}}>Pay Now</button></div></div></div>
      ))
      var card2=this.state.installment.map((item) => (<div class={Styles.box1}><div key={item.id}><h1 > &#x20b9; {item.fee_amount}</h1><br/><p style={{fontFamily: 'Montserrat',fontStyle: 'normal',fontWeight: 'normal',fontSize: '15px',lineHeight: '191.6%', textAlign: 'center' ,color: '#000000'}}>{item.desc}</p><br/><p style={{fontFamily: 'Montserrat',fontStyle: 'normal',fontWeight: 'normal',fontSize: '20px',lineHeight: '191.6%', textAlign: 'center' ,color: '#000000'}}>{item.validity} month</p><button id={Styles.btn3} onClick={()=>{this.onPayNowClick(item)}}>Pay Now</button></div></div>
      ))
  return (
    <div>
    <nav class={Styles.navbar}>
        <div class="container-fluid">
          <div class="navbar-header">
            <button id={Styles.btn1} type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <svg id={Styles.img1} width="150" height="51" viewBox="0 0 194 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37.8515 23.275L0 12.2767L37.8515 0L75.7031 12.2767L72.2138 12.9666C72.2138 16.2134 72.2138 19.4601 72.2138 22.6865C73.5402 23.1938 74.4788 24.249 74.4788 25.9738C74.4788 27.6987 72.8872 29.4844 70.9487 29.4844C68.9898 29.4844 67.4186 27.6987 67.4186 25.9738C67.4186 24.249 68.3572 23.1938 69.704 22.6865C69.704 19.6427 69.704 16.5786 69.704 13.5348L37.8515 23.275Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0417 38.3162L36.0023 42.9192V47.7063L13.6633 40.8121V36.0454L28.9297 30.8492L13.6633 26.1439V21.3568L36.0023 28.2511V28.4352V33.0177V33.2223L21.0417 38.3162ZM40.0992 42.9192L62.4383 35.6567V40.4438L40.0992 47.7063V42.9192ZM40.0992 28.2306L62.4383 20.9681V25.7552L40.0992 33.0177V28.2306ZM40.0992 35.5749V40.362L56.7516 34.9407V30.1536L40.0992 35.5749ZM38.1221 51L64.9453 42.285C64.9453 28.6193 64.9453 33.9792 64.9453 17.5312L38.0813 26.2667L11.1562 17.9609C11.1562 34.6952 11.1562 27.0032 11.1562 42.6737L38.1221 51Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M126.055 21.5156C123.322 21.5562 121.226 22.5717 120.034 24.765V21.6578H115.945V38.25H120.034V30.0859C120.034 27.3645 121.658 25.3336 124.432 25.3133C126.754 25.3133 128.172 26.7349 128.172 29.0704V38.25H132.281V27.8926C132.261 23.9527 129.918 21.5156 126.055 21.5156Z" fill="white"/>
            <path d="M110.766 21.5156H106.781V38.25H110.766V21.5156Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M108.973 14.7422C107.682 14.7422 106.781 15.6586 106.781 16.9336C106.781 18.2086 107.682 19.125 108.973 19.125C110.263 19.125 111.164 18.2086 111.164 16.9336C111.164 15.6586 110.242 14.7422 108.973 14.7422Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M84.8785 16.3359L84.858 20.0019H97.3765L84.4688 35.2599V38.25H103.195V34.584H90.1441L103.031 19.2851V16.3359H84.8785Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M189.676 21.1171V29.4862C189.676 32.2066 188.162 34.3041 185.592 34.3457C183.401 34.3457 182.086 32.9127 182.086 30.5453V21.1171H178.102V31.7498C178.102 35.7578 180.353 38.2499 183.998 38.2499C186.588 38.2499 188.541 37.2115 189.656 34.9479V38.0837H193.641V21.1171H189.676Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M169.282 14.7628V24.0302C168.065 22.1398 166.158 21.1123 163.601 21.1123C158.954 21.1123 155.789 24.544 155.789 29.6195C155.789 34.7362 158.954 38.25 163.702 38.25C166.178 38.25 168.106 37.2226 169.282 35.3526V38.0445H173.32V14.7422H169.282V14.7628ZM164.575 34.8184C161.775 34.8184 159.888 32.7224 159.868 29.7017C159.908 26.7221 161.815 24.5851 164.575 24.5851C167.375 24.5851 169.282 26.681 169.282 29.7017C169.282 32.7018 167.355 34.8184 164.575 34.8184Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M136.664 34.2656V37.8516H153V34.2656H140.84H136.664Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M136.664 25.1016V28.6675H142.773V28.6875H151.406V25.1016H140.838H136.664Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M136.664 15.9376V19.922H140.831H142.763H152.602V15.9376H136.664Z" fill="white"/>
            </svg>

          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right" id="close">
            <button id={Styles.btn2} onClick={this.Logout}>Logout</button>

            </ul>
          </div>
        </div>
      </nav>

      <div className="container"  id={Styles.feeportal}>
<center>
        <p style={h2}>Installment</p>
        {load}
        <p style={text1}>**Note:All Fees are Inclusive of GST**</p>
</center>
<div class="row">
<div id={Styles.bigcard}>
        {card1}
</div>
<div id={Styles.smallcard}>
        {card2}
</div>

        </div>

        </div>
    </div>
  );
}
}
export default Installment;