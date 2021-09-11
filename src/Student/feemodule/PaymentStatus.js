import {Component} from 'react';
import axios from 'axios';
import Config from '../../config.json';
import MaterialTable from 'material-table';
import dateFormat from 'dateformat';
import Styles from '../studentdashboard.module.css';
import Studentnav from '../studentnav';

class PaymentStatusStudent extends Component{
  constructor(){
    super();
    let data=localStorage.getItem("userdetail");

    data= JSON.parse(data);
     let student=data.username;
   this.state={
       token:data.token,
       student:student,
       isloading:false,
       fees:[],
       }

}
componentDidMount=()=>{
  // console.log(this.props);
  // var requestOptions = {
  //   redirect: 'follow',
  //   headers:{
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Token '+ this.state.token
  //   },
  // };
  // axios.get(Config.SERVER_URL+'users/get-student-installments/?student_username='+this.state.student,requestOptions)
  // .then(response =>{
  //     const lang=response.data;
  //     console.log(lang);
  //     this.setState({
  //           fees:lang,
  //           isloading:false,
  //     });
  //   })
  //     .catch(error => {
  //       console.log(error);
  //       // this.props.history.push('/error');
  //     });
}
payment=(item)=>{
  this.props.history.push({
    pathname:'/student/feemodule/payment',
    state:{
      id:item,
    },
  });
}
  render(){

    return(
      <div>
      <Studentnav/>
      <div class="container">
      <div class="row">
      <div className="col-md-12" style={{marginTop:'50px'}}>
      <div class="title">
      <p style={{fontFamily:'Montserrat', fontWeight:'bold', fontSize:'20px', display:'inline-block'}}>Payment Plans</p>
      <p style={{fontFamily:'Montserrat', fontWeight:'bold', fontSize:'20px', marginTop:'20px'}}>{this.state.fees.length} Installment :</p>
      </div>
      <div class="install">
      {this.state.fees.map((item)=>(<div key={item.id} style={{marginBottom:'30px', border:'1px solid lightgrey', borderRadius:'34px', padding:'20px'}}><p style={{fontStyle:'Montserrat', fontWeight:'bold', fontSize:'39px', color:'#EA7A26'}}>₹ {item.amount_payable}</p>
      {item.status=='Unpaid'?(<div><button onClick={()=>this.payment(item.id)} class="btn" style={{background:'#1C3687', border:'none', borderRadius:'34px', fontStyle:'Montserrat', color:'white', width:'150px', fontWeight:'bold'}}>Pay Now</button></div>):(<div></div>)}</div>))}
      </div>
      </div>
      </div>
      </div>
      </div>

    );
  }
}
export default PaymentStatusStudent;
