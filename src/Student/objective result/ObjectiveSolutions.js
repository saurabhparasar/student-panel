import {Component} from 'react';
import parse from 'html-react-parser';
import Styles from '../studentdashboard.module.css';
import ReactPlayer from 'react-player';

class ObjectiveSolutionResult extends Component{
  constructor(props) {
    super(props);
    this.state={
      playing:false,
    }
console.log(this.props);
  }
  render(props){
    var box3={
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        padding: '15px',
        overflow: 'auto',
        minHeight: '80px',
      }
    var ques={
      color: 'black',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      letterSpacing: '0.05em',
      lineHeight: '100.2%',

      }
    var box4={
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        padding: '15px',
        overflow: 'auto',
        minHeight: '60px',
      }
    var option={
        color: 'black',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: '20px',
        letterSpacing: '0.05em',
        lineHeight: '100.2%',
      }

var solutiontext;
if(this.props.testing.question_assoc.solution_text!=null){
  solutiontext = (<div>{parse(this.props.testing.question_assoc.solution_text)}</div>)
}
var solutionvideo;
if(this.props.testing.question_assoc.solution_video!=null){
  solutionvideo = (<div><button style={{ border:'none', width:'200px', padding:'7px', background: '#EA7A26', borderRadius:'26px', marginLeft:'30px', color:'white', fontWeight:'bold', fontFamily:'Montserrat', fontSize:'16px'}} data-toggle="modal" data-target="#answer_video">Video Solution</button></div>)
}


    return(<div id={Styles.objectivequestion}>
      <div class="box" style={{border:'1px solid #BEC5D3', padding:'15px', borderRadius:'10px'}}>
    <div className="row">
    <div class="col-sm-12">
    <svg style={{display:'inline-block', marginBottom:'-3px', marginRight:'10px'}} width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5889 13.4086C22.5889 8.67278 18.736 4.81982 14.0001 4.81982C9.26423 4.81982 5.41138 8.67278 5.41138 13.4086C5.41138 16.3129 6.89418 19.0273 9.31181 20.6059V23.3117C9.31181 25.8968 11.4149 27.9999 14 27.9999C16.5851 27.9999 18.6882 25.8968 18.6882 23.3117V21.792C18.6882 21.7916 18.6882 20.606 18.6882 20.606C21.1061 19.0274 22.5889 16.313 22.5889 13.4086ZM17.0326 23.3118C17.0326 24.9839 15.6722 26.3442 14.0001 26.3442C12.328 26.3442 10.9676 24.9839 10.9676 23.3118V22.6198H17.0326V23.3118ZM17.4481 19.425C17.191 19.5726 17.0326 19.8464 17.0326 20.1429V20.9641H14.8279V16.6832C15.9029 16.3335 16.6823 15.3225 16.6823 14.1324C16.6823 13.6752 16.3116 13.3045 15.8544 13.3045C15.3972 13.3045 15.0266 13.6752 15.0266 14.1324C15.0266 14.6983 14.5661 15.1588 14.0001 15.1588C13.4342 15.1588 12.9736 14.6984 12.9736 14.1324C12.9736 13.6752 12.603 13.3045 12.1458 13.3045C11.6886 13.3045 11.3179 13.6752 11.3179 14.1324C11.3179 15.3224 12.0973 16.3335 13.1723 16.6832V20.9641H10.9677V20.1428C10.9677 19.8464 10.8093 19.5726 10.5523 19.425C8.40257 18.19 7.06721 15.8847 7.06721 13.4086C7.06721 9.58574 10.1773 6.47555 14.0003 6.47555C17.8232 6.47555 20.9334 9.58568 20.9334 13.4086C20.9333 15.8847 19.5978 18.1901 17.4481 19.425Z" fill="#EA7A26"/>
<path d="M14 0C13.5428 0 13.1721 0.370673 13.1721 0.827861V2.28118C13.1721 2.73837 13.5428 3.10905 14 3.10905C14.4572 3.10905 14.8278 2.73837 14.8278 2.28118V0.827861C14.8278 0.370673 14.4572 0 14 0Z" fill="#EA7A26"/>
<path d="M11.6712 2.49353L11.1574 1.13399C10.9957 0.706335 10.5178 0.490702 10.0903 0.652303C9.66266 0.81396 9.44697 1.29171 9.60862 1.71937L10.1224 3.0789C10.2476 3.4102 10.5625 3.61429 10.897 3.61429C10.9942 3.61429 11.0932 3.59701 11.1895 3.56059C11.6172 3.39893 11.8329 2.92118 11.6712 2.49353Z" fill="#EA7A26"/>
<path d="M17.9095 0.652341C17.4818 0.49063 17.0041 0.706427 16.8424 1.13408L16.3286 2.49362C16.167 2.92122 16.3827 3.39897 16.8103 3.56063C16.9067 3.59705 17.0056 3.61433 17.1028 3.61433C17.4373 3.61433 17.7522 3.41024 17.8774 3.07894L18.3912 1.71941C18.5529 1.29169 18.3372 0.813997 17.9095 0.652341Z" fill="#EA7A26"/>
</svg><p style={{display:'inline-block', fontFamily:'Montserrat', fontSize:'17px', fontWeight:'bold', color:'#1C3687'}}>Solution</p>
<div class="gap" style={{marginTop:'20px'}}>
{solutiontext}
<br/>
{solutionvideo}
<div id="answer_video" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" onClick={()=>{this.setState({solution_video:null})}} data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Answer Video: </h4>
      </div>
      <div class="modal-body">

      <ReactPlayer
    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
    onContextMenu={e => e.preventDefault()}
    playing= {this.state.playing}
    controls url={this.props.testing.question_assoc.solution_video} width='100%'/>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
    </div>
    </div>
 </div>)}
}
export default ObjectiveSolutionResult;
