import {Component} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import dateFormat from 'dateformat';
import Studentnav from './studentnav';

class SubmittedAssignment extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
         let studentname=data.username;
       this.state={
           token:data.token,
           student:studentname,
           assignments:[],
           gotassignment:false,
           isloading:false,
        }
    }

    componentDidMount=()=>{
        this.setState({isloading:true});
        var formdata = new FormData();
        formdata.append('page_name','student-submittedassignment');
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

        var requestOptions = {
            redirect: 'follow',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ this.state.token
            },
          };
        axios.get('https://zinedu-main.herokuapp.com/student/get-submitted-assignments/?student='+this.state.student,requestOptions)
        .then(response =>{
            console.log(response.data);
            const cls=response.data;
            this.setState({
               assignments:cls,
               isloading:false,
                });
        });
    }
  onAssignmentClick=(item)=>{
            this.props.history.push(
              {  pathname:'/student/updateassignment',
                 state:{assignment:item},
            }
            )
  }
render(){
    var load;
   if(this.state.isloading){
     load=(<p><ReactLoading type="cylon" color="#09AEE5"/></p>);
   }
    return(
            <div>
            <Studentnav  history={this.props.history}/>
            <div class="container">
                {load}
                <div style={{marginTop:'50px'}}>
               <MaterialTable
            title="List Of Submitted Assignment"
            columns={[
              { title: 'ID', field: 'id' },
              { title: 'Assignment Topic', field: 'assignment_assoc.assignment_desc'},
              { title:'Chapter', field:'assignment_assoc.chapter_assoc.chapter_name'},
              { title: 'Date of submission', field: 'dos', render: rowData => <div> {dateFormat(rowData.date_of_submission,"dddd, mmmm d, yyyy HH:MM")} </div>},
              { title: 'Update', field: 'Action', render: rowData => <div>  <i style={{fontSize:'17px', cursor:'pointer', color:'grey'}} onClick={()=>{this.onAssignmentClick(rowData)}}class="fas fa-tasks"></i></div>},
            ]}
            data={this.state.assignments}
            options={{
              headerStyle: {
                backgroundColor: '#09AEE5',
                color: '#FFF',
                fontSize:'14px'
              },
            search: true,
            searchFieldAlignment: "right",
            searchAutoFocus : true,
            searchFieldVariant: 'outlined',
            exportButton: true,
            sorting:true,
            }}

          />
          </div>
          </div>

            </div>


    )
}
}
export default SubmittedAssignment;