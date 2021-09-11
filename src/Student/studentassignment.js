import {Component} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import Studentnav from './studentnav';

class StudentAssignment extends Component {
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
           selected_subject_id:'',
        }
    }

    componentDidMount=()=>{
        this.setState({isloading:true});
        var formdata = new FormData();
        formdata.append('page_name','student-assignment');
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

          if(this.props.location.state===undefined){


            axios.get('https://zinedu-main.herokuapp.com/student/get-student-assignments/?student='+this.state.student,requestOptions)
            .then(response =>{
              console.log(response.data);
              const cls=response.data;
              this.setState({
                assignments:cls,
                isloading:false,
              });
            });
          }
          else{

                        this.setState({
                          selected_subject_id:this.props.location.state.selected_subject_id,
                        });
            axios.get('https://zinedu-main.herokuapp.com/student/get-student-assignments/?student='+this.state.student+'&subject='+this.props.location.state.selected_subject_id,requestOptions)
            .then(response =>{
              console.log(response.data);
              const cls=response.data;
              this.setState({
                assignments:cls,
                isloading:false,
              });
            });

          }

          }

  onAssignmentClick=(item)=>{
            this.props.history.push(
              {  pathname:'/student/submitassignment',
                 state:{assignment:item},
            }
            )
  }
render(){
    var load;
   if(this.state.isloading){
     load=(<p><ReactLoading type="cylon" color="#09AEE5"/></p>);
   }
   var btn2={
     background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
     border: 'none',
     marginTop: '10px',
     padding: '10px',
     borderRadius: '5px',
     fontWeight: 'bold',
     color:'white',
     float:'right',
     textDecoration:'none',
   }
    return(
            <div>
            <Studentnav  history={this.props.history}/>
            <div class="container">
                <Link to="/student/submittedassignment" style={btn2}>Submitted Assignment</Link>
                {load}
                <div style={{marginTop:'100px'}}>
               <MaterialTable
            title="List Of Assignment"
            columns={[
              { title: 'ID', field: 'id' },
              { title: 'Assignment Topic', field: 'assignment_desc'},
              { title:'Chapter', field:'chapter_assoc.chapter_name'},
              { title: 'Date of submission', field: 'dos', render: rowData => <div> {dateFormat(rowData.final_submission_date,"UTC:dddd, mmmm d, yyyy HH:MM:ss")} </div>},
              { title: 'Action', field: 'Action', render: rowData => <div>  <i style={{fontSize:'17px', cursor:'pointer', color:'grey'}} onClick={()=>{this.onAssignmentClick(rowData)}}class="fas fa-tasks"></i></div>},
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
<br/>
            </div>


    )
}
}
export default StudentAssignment;
