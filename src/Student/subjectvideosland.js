import {Component} from 'react';
import axios from 'axios';
import Styles from './studentnav.module.css';
import Studentnav from './studentnav';
import ReactLoading from 'react-loading';
import Config from '../config.json';
class SubjectVideoLands extends Component {
    constructor(){
        super();
        let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
         let studentname=data.username;
       this.state={
           token:data.token,
           student:studentname,
           videos:[],
            searchedVideo:'',
            isSearched:false,
            searchText:'',
           isloading:false,
        }
    }
  Logout=() =>{
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount=()=>{
      let sub=this.props.location.state.subject;
      console.log(sub);
    this.setState({isloading:true});
    var requestOptions = {
        redirect: 'follow',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ this.state.token
        },
      };

      axios.get(Config.SERVER_URL+'student/get-chapter-lectures-per-subject/?subject='+sub,requestOptions)
        .then(response =>{
            const lang=response.data;
            console.log(lang);
            this.setState({
                 videos:lang,
                   isloading:false,
            });
        })
        .catch(error => { 
          this.props.history.push('/error');
       });
  }
  onSubjectClick=(item)=>{

      this.props.history.push({
        pathname:'/student/videoplayer',
        state:{video:item},
      })
    }
  onSearchHandle=(event)=>{
    event.preventDefault();
    const searchedVideo=[];
    var found=false;
    for(var i=0;i<this.state.videos.length;i++){
      for(var j=0;j<this.state.videos[i].video_tags.length;j++){
        if(this.state.videos[i].video_tags[j].tag_name.toLowerCase().includes(this.state.searchText.toLowerCase()))
 { found=true;
   break;
 }     }
      if(found){
        searchedVideo.push(this.state.videos[i]);
      }
    }
    console.log(searchedVideo)
      this.setState( {
        searchedVideo:searchedVideo,
        isSearched:true,
      })
  }
  onSearchTextChange=(event)=>{
    console.log(event.target.value);
    this.setState({searchText:event.target.value})
  }
  clearSearch=()=>{
    this.setState({
      searchedVideo:[],
      isSearched:false,
    })
    document.getElementById("search").reset();
  }
  render(){
    var load;
    if(this.state.isloading){
      load=(<p><ReactLoading type="cylon" color="#09AEE5"/></p>);
    }
    var dashboard={
      marginTop:'50px'
    }
    var column={
  float: 'left',
  width: '33.33%',
  padding: '10px',
  height: '300px', /* Should be removed. Only for demonstration */
}
    var box1={
      justifyContent:'center',
      alignItems:'center',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '175px',
      border: '2px solid black',
      textAlign:'center'
    }
    var btn1={
      border: 'none',
      marginTop: '30px',
      width:'100px',
      padding: '10px',
      background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
      color:'white',
    borderRadius: '43px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    textAlign: 'center',
    textTransform: 'capitalize',
    }
    var btn2={
      border: 'none',
      margin: '20px',
      width:'150px',
      padding: '10px',
      background: 'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
      color:'white',
    borderRadius: '43px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    textAlign: 'center',
    textTransform: 'capitalize',
    float:'right',
    }
    var videos;
  if(this.state.isSearched==false){
  videos=this.state.videos.map((item)=>{ return <div class={Styles.column1} key={item.id}> <div style={box1}>
   <img src={item.lecture_thumbnail} height="200px" width="100%auto" alt=""/>
   <p>{item.video_name}</p>
<button style={btn1} onClick={()=>this.onSubjectClick(item)}>Play Now</button>
  </div></div>});
  }else{
    if(this.state.searchedVideo.length==0){
      videos=(<div>No such Video Exist!!</div>);
    }else{
      videos=this.state.searchedVideo.map((item)=>{ return <div class={Styles.column1} key={item.id}> <div style={box1} key={item.id}>
      <img src={item.lecture_thumbnail}  height="200px" width="100%auto" alt=""/>
      <p>{item.video_name}</p>
   <button style={btn1} onClick={()=>this.onSubjectClick(item)}>Play Now</button>
     </div></div>});
  }}
  return (
    <div>

<Studentnav/>
<div style={dashboard}>
<div class="container">

      <br/>
      <div className="row">
      <div class="col-sm-8">
      {load}
</div>
      <div class="col-sm-4">
      {this.state.isloading ?(<div></div>):( <div> <form onSubmit={this.onSearchHandle} id="search">
        <div class="input-group">
    <input class="form-control" type="text" placeholder="search" onChange={this.onSearchTextChange} required/>
      <div class="input-group-btn">
        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
      </div>
    </div>
    <button style={btn2} type="button" onClick={this.clearSearch}>Clear Search</button>
        </form></div>)}

        </div>

      </div>
      <br/>
<div class="row">



  {videos}


</div>
</div>
</div>
<br/>

    </div>
  );
}
}
export default SubjectVideoLands;