import {Component} from 'react';
import ObjectiveResultSideNav from './SideNav.js';
import Styles from './sidenav.module.css';
import axios from 'axios';
import Config from '../../config.json';

class PercentageAndScore extends Component{
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
       total_marks:'',
       percentile:[],
       }

}
componentDidMount=()=>{
  console.log(this.props);
  if(this.props.location.state){
this.setState({
  exam_id:this.props.location.state.exam_id,
});
    var requestOptions = {
      redirect: 'follow',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token
      },
    };
    axios.get(Config.SERVER_URL+'student/get-objective-exam-result/?student='+this.state.student+'&exam='+this.props.location.state.exam_id,requestOptions)
    .then(response =>{console.log(response.data)
      const cls=response.data;
      this.setState({
        result:cls.result,
        total_marks:cls.total_marks,
        isloading:false,

      });
    })
    .catch(error => {
      console.log(error);
    });
    axios.get(Config.SERVER_URL+'student/get-student-percentile/?exam='+this.props.location.state.exam_id+'&username='+this.state.student,requestOptions)
    .then(response =>{console.log(response.data)
      const cls=response.data;
      this.setState({
        percentile:cls.Percentile,

      });
    })
    .catch(error => {
console.log(error);
    });
  }
  else{
    this.props.history.push('/');
  }
}
  render(){
    console.log(this.state.exam_id);
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
    {this.props.location.state!=null?( <ObjectiveResultSideNav exam_id={this.props.location.state.exam_id}/>):(<ObjectiveResultSideNav exam_id={this.props.exam_id}/>)}
      </div>

      <div class="col-md-9" style={{padding:'0px'}}>
      <nav id={Styles.nav}>
          <div style={title}>
            <p style={text2}>Percentile And Score</p>
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
        <div class="col-sm-6" style={{marginBottom:'30px'}}>
        <div class="box" style={{boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.19)', borderRadius:'14px'}}>
        <div style={{borderBottom:'1px solid #E7E7E7', padding:'20px 0 10px 30px'}}>
        <svg style={{marginRight:'10px', marginBottom:'-7px'}} width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35 19.9355C35 15.1547 33.0722 10.8162 29.954 7.65456C29.9297 7.6222 29.9038 7.59053 29.8743 7.56104C29.8448 7.53155 29.8132 7.50561 29.7809 7.4814C26.6193 4.36319 22.2808 2.43555 17.5 2.43555C12.7192 2.43555 8.38072 4.3633 5.21902 7.4814C5.18666 7.50573 5.1551 7.53166 5.12561 7.56104C5.09611 7.59053 5.07018 7.62209 5.04585 7.65456C1.92775 10.8162 0 15.1547 0 19.9355C0 24.6094 1.81989 29.0032 5.12434 32.3084C5.1248 32.3089 5.12526 32.3095 5.12572 32.3099C5.12607 32.3102 5.1263 32.3105 5.12664 32.3107C5.1271 32.3112 5.12756 32.3117 5.12802 32.3121C5.29602 32.4801 5.51623 32.564 5.73644 32.564C5.95677 32.564 6.1771 32.48 6.3451 32.3119C6.35944 32.2975 6.37241 32.2823 6.38549 32.2671L9.03769 29.6148C9.3738 29.2786 9.3738 28.7337 9.03769 28.3976C8.70157 28.0616 8.15661 28.0616 7.82061 28.3976L5.7509 30.4673C3.33751 27.7817 1.93739 24.4018 1.74484 20.7962H4.67187C5.14718 20.7962 5.53252 20.411 5.53252 19.9355C5.53252 19.4601 5.14718 19.0749 4.67187 19.0749H1.74507C1.9452 15.3715 3.42828 12.004 5.75652 9.40927L7.82061 11.4734C7.98861 11.6414 8.20893 11.7254 8.42915 11.7254C8.64936 11.7254 8.86969 11.6414 9.03769 11.4734C9.3738 11.1371 9.3738 10.5923 9.03769 10.2562L6.97372 8.19196C9.56854 5.86371 12.936 4.38063 16.6393 4.18061V7.10753C16.6393 7.58296 17.0247 7.96819 17.5 7.96819C17.9753 7.96819 18.3607 7.58296 18.3607 7.10753V4.18061C22.064 4.38063 25.4315 5.86383 28.0263 8.19207L25.9622 10.2562C25.6261 10.5924 25.6261 11.1372 25.9622 11.4734C26.1302 11.6414 26.3505 11.7254 26.5707 11.7254C26.791 11.7254 27.0113 11.6414 27.1793 11.4734L29.2434 9.40927C31.5716 12.0041 33.0548 15.3715 33.2548 19.0749H30.3279C29.8526 19.0749 29.4672 19.4601 29.4672 19.9355C29.4672 20.411 29.8526 20.7962 30.3279 20.7962H33.2549C33.0624 24.4018 31.6624 27.7819 29.249 30.4674L27.1793 28.3976C26.8433 28.0616 26.2983 28.0616 25.9622 28.3976C25.6261 28.7339 25.6261 29.2787 25.9622 29.6148L28.6572 32.3098C28.8252 32.4778 29.0455 32.5618 29.2657 32.5618C29.3758 32.5618 29.4859 32.5408 29.5896 32.4988C29.6932 32.4568 29.7903 32.3938 29.8744 32.3098C33.1797 29.0044 35 24.6098 35 19.9355Z" fill="#EB7926"/>
<path d="M21.454 10.0659C21.0125 9.88907 20.5117 10.1034 20.335 10.5448L17.8479 16.753C17.732 16.7406 17.6161 16.7321 17.5001 16.7321C16.2888 16.7321 15.1946 17.4031 14.6443 18.4831C14.0692 19.6122 14.2165 20.9612 15.0382 22.0916C15.1222 22.2071 15.2278 22.3128 15.3441 22.3974C16.0116 22.8827 16.7572 23.1392 17.5001 23.1392C18.7115 23.1392 19.8058 22.4682 20.3559 21.3881C20.931 20.2591 20.7837 18.9101 19.9626 17.7806C19.8786 17.6647 19.7728 17.5587 19.6561 17.4737C19.5933 17.4281 19.5292 17.3864 19.465 17.3449L21.9328 11.1848C22.1096 10.7436 21.8952 10.2426 21.454 10.0659ZM18.822 20.6068C18.5671 21.107 18.0606 21.4177 17.5 21.4177C17.1323 21.4177 16.7622 21.2893 16.3996 21.0359C15.9865 20.4428 15.9054 19.7997 16.1781 19.2644C16.4329 18.7642 16.9394 18.4534 17.5001 18.4534C17.6789 18.4534 17.8581 18.4844 18.0369 18.5446C18.0428 18.547 18.0482 18.5501 18.0541 18.5525C18.073 18.56 18.0919 18.5661 18.1108 18.5722C18.2749 18.6352 18.4383 18.7219 18.6004 18.8351C19.0134 19.4282 19.0946 20.0714 18.822 20.6068Z" fill="#EB7926"/>
</svg><span style={{fontSize:'16px', fontFamily:'Montserrat'}}>Score</span>
        </div>
        <center>
        <div style={{padding:'20px 0 20px 0'}}>
        <p style={{fontSize:'24px', fontFamily:'Montserrat'}}><span style={{fontSize:'28px', fontWeight:'bold'}}>{this.state.result.marks_obtained} </span> / {this.state.total_marks}</p>
        </div>
</center>
        </div>
        </div>
        <div class="col-sm-6">
        <div class="box" style={{boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.19)', borderRadius:'14px'}}>
        <div style={{borderBottom:'1px solid #E7E7E7', padding:'20px 0 10px 30px'}}>
        <svg style={{marginRight:'10px', marginBottom:'-5px'}} width="25" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.42726 0C8.43948 0 10.0137 0.650118 11.1501 1.95035C12.2864 3.25059 12.8545 5.0591 12.8545 7.37589C12.8545 9.69267 12.2864 11.513 11.1501 12.8369C10.0137 14.1371 8.43948 14.7872 6.42726 14.7872C4.41504 14.7872 2.84078 14.1371 1.70447 12.8369C0.568156 11.513 0 9.69267 0 7.37589C0 5.0591 0.568156 3.25059 1.70447 1.95035C2.84078 0.650118 4.41504 0 6.42726 0ZM6.42726 1.98582C5.10157 1.98582 4.07178 2.45863 3.33792 3.40426C2.62772 4.32624 2.27262 5.65012 2.27262 7.37589C2.27262 9.10165 2.62772 10.4374 3.33792 11.383C4.07178 12.305 5.10157 12.766 6.42726 12.766C7.75296 12.766 8.77091 12.305 9.4811 11.383C10.215 10.4374 10.5819 9.10165 10.5819 7.37589C10.5819 5.65012 10.215 4.32624 9.4811 3.40426C8.77091 2.45863 7.75296 1.98582 6.42726 1.98582ZM23.1879 0.0709211H25.8866L7.45704 24.8936H4.7228L23.1879 0.0709211ZM24.5727 10.2128C26.585 10.2128 28.1592 10.8629 29.2955 12.1631C30.4318 13.4634 31 15.2719 31 17.5886C31 19.9054 30.4318 21.7258 29.2955 23.0496C28.1592 24.3499 26.585 25 24.5727 25C22.5605 25 20.9863 24.3499 19.8499 23.0496C18.7136 21.7258 18.1455 19.9054 18.1455 17.5886C18.1455 15.2719 18.7136 13.4634 19.8499 12.1631C20.9863 10.8629 22.5605 10.2128 24.5727 10.2128ZM24.5727 12.1986C23.247 12.1986 22.2173 12.6714 21.4834 13.617C20.7732 14.539 20.4181 15.8629 20.4181 17.5886C20.4181 19.3144 20.7732 20.6501 21.4834 21.5957C22.2173 22.5177 23.247 22.9787 24.5727 22.9787C25.8984 22.9787 26.9164 22.5177 27.6266 21.5957C28.3604 20.6501 28.7274 19.3144 28.7274 17.5886C28.7274 15.8629 28.3604 14.539 27.6266 13.617C26.9164 12.6714 25.8984 12.1986 24.5727 12.1986Z" fill="#EB7926"/>
</svg>
<span style={{fontSize:'16px', fontFamily:'Montserrat'}}>Percentile</span>
        </div>
        <center>
        <div style={{padding:'20px 0 20px 0'}}>
        <p style={{fontSize:'24px', fontFamily:'Montserrat'}}><span style={{fontSize:'28px', fontWeight:'bold'}}>{this.state.percentile} </span> %</p>
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
export default PercentageAndScore;
