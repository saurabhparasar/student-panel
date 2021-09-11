import {Component} from 'react';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import Config from '../../config.json';
import axios from 'axios';
class ListOfQuestionsStudentDoubt extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
       this.state={
           questions:[],
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
    formdata.append('page_name','List-Of-Questions-Student-Doubt');
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
   var requestOptions1 = {
    redirect: 'follow',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token
    },
  };

   axios.get(Config.SERVER_URL+'support/get-doubt-module-questions/?chapter='+this.props.location.state.chapter_id,requestOptions1)
   .then(response =>{console.log(response.data)
       const ch=response.data;
       this.setState({
           questions:ch,
           isloading:false,

       });
   })
   .catch(error => {
       this.props.history.push('/error');
    });
}





onUpdateClick=(item)=>{
  this.props.history.push(
    {  pathname:'/student/doubtmodule/questiondetails',
       state:{question:item},
  }
  )
}
  render(){
    var mess=(<p>{this.state.message}</p>);
    var load;
    if(this.state.isloading){
      load=(<p><ReactLoading type="spinningBubbles" color="blue" height="3px" /></p>)
    }
    var table;
    if(this.state.questions){
      table=(
        <MaterialTable
        title="List Of Questions"
        columns={[
          { title: 'Question Id', field: 'id' },
          { title: 'Question No', field: 'question_number' },
          { title: 'Question Text', field: 'question_text'},
          { title: 'Question Details', field: 'Action', render: rowData => <div><i style={{fontSize:'20px', cursor:'pointer',margin:'0px 0px 0px 20px', color:'gray'}} class="far fa-eye" onClick={()=>this.onUpdateClick(rowData)}></i></div>},
        ]}
        data={this.state.questions}
        options={{
          headerStyle: {
              backgroundColor: '#09AEE5',
              color: '#FFF',
              fontSize:'16px'
            },
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus : true,
          searchFieldVariant: 'outlined',
          exportButton: true,
          sorting:true,

        }}

      />
     );
  }

  return (
    <div className="container-fluid">
  <div >
      <div className="row">
  <div className="col-md-2">
      </div>
      <div className="col-md-10">

      <br/>
      <h2>List Of Questions</h2>
      <br/>
      {table}
          </div>
  </div>

  </div>
    </div>
  );
}
}
export default ListOfQuestionsStudentDoubt;
