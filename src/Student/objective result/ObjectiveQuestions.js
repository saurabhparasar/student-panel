import {Component} from 'react';
import parse from 'html-react-parser';
import Styles from '../studentdashboard.module.css';

class ObjectiveQuestionResult extends Component{
  constructor(props) {
    super(props);
    this.state={
      finaltime:0,
    };
  }
  render(props){
    let finaltime;
    console.log(this.props.testing);
    console.log(this.props.index);
    if(this.props.testing.end_time!=null && this.props.testing.start_time!=null){
    let endtime =  this.props.testing.end_time.split('T')[1];
    let starttime =  this.props.testing.start_time.split('T')[1];
    let endhours = Number(endtime.split(':')[0]);
    let endminutes = Number(endtime.split(':')[1]);
    let endseconds = Math.floor(parseFloat(endtime.split(':')[2]));
    let starthours = Number(starttime.split(':')[0]);
    let startminutes = Number(starttime.split(':')[1]);
    let startseconds = Math.floor(parseFloat(starttime.split(':')[2]));
    let finalend = endhours*60*60 + endseconds + endminutes*60;
    let finalstart = starthours*60*60 + startseconds + startminutes*60;
    finaltime = finalend - finalstart;
    if(finaltime>300 || finaltime<0){
      finaltime = 0;
    }
  }
  else{
    finaltime = 0;

  }
    console.log(finaltime);
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


    return(<div id={Styles.objectivequestion}>
      <div class="box" style={{border:'1px solid #BEC5D3', padding:'15px', borderRadius:'10px'}}>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'20px', borderBottom:'1px solid #BEC5D3', overflow:'auto'}}>

      <p style={{fontSize:'18px', fontFamily:'Montserrat', fontWeight:'bold', marginBottom:'20px'}}>Q{this.props.index+1}.         {parse(this.props.testing.question_assoc.question_text)}</p>

      </div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'20px', paddingLeft:'0px', paddingRight:'0px'}}>
      {this.props.testing.question_assoc.correct_option === '1'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option1_text)}
 <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='1'
                                     checked={this.props.testing.question_assoc.correct_option === '1'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>1</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option1_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='1'
                                            checked={this.props.testing.question_assoc.correct_option === '1'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>1</span></label> </div>)}


      </div>
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.question_assoc.correct_option === '2'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option2_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='2'
                                     checked={this.props.testing.question_assoc.correct_option === '2'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>2</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option2_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='2'
                                            checked={this.props.testing.question_assoc.correct_option === '2'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>2</span></label> </div>)}

      </div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.question_assoc.correct_option === '3'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option3_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='3'
                                     checked={this.props.testing.question_assoc.correct_option === '3'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>3</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option3_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='3'
                                            checked={this.props.testing.question_assoc.correct_option === '3'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>3</span></label> </div>)}

      </div>
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.question_assoc.correct_option === '4'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option4_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='4'
                                     checked={this.props.testing.question_assoc.correct_option === '4'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>4</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option4_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='4'
                                            checked={this.props.testing.question_assoc.correct_option === '4'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>4</span></label> </div>)}

      </div>
    </div>
    </div>
<div class="row" style={{marginTop:'20px', padding:'10px'}}>

  <div class="col-xs-6" style={{marginBottom:'10px'}}>
  <p style={{display:'inline', fontSize:'15px', fontFamily:'Montserrat'}}><span class="box" style={{height:'13px', width:'13px', borderRadius:'50%', background:'#EB7926', display:'inline-block'}}></span> Attempted : {this.props.testing.ans_given==0?(<div style={{display:'inline'}}>No</div>):(<div style={{display:'inline'}}>Yes</div>)}</p>
  </div>
  <div class="col-xs-6" style={{marginBottom:'10px'}}>
  <p style={{display:'inline', fontSize:'15px', fontFamily:'Montserrat'}}><span class="box" style={{height:'13px', width:'13px', borderRadius:'50%', background:'#1C3687', display:'inline-block'}}></span> Your Answer : {this.props.testing.ans_given==0?(<div style={{display:'inline'}}></div>):(<div style={{display:'inline'}}>{this.props.testing.ans_given}</div>)}</p>
  </div>
  <div class="col-xs-6"  style={{marginBottom:'10px'}}>
  <p style={{display:'inline', fontSize:'15px', fontFamily:'Montserrat'}}><span class="box" style={{height:'13px', width:'13px', borderRadius:'50%', background:'#4CAF50', display:'inline-block'}}></span> Correct Answer : {this.props.testing.question_assoc.correct_option}</p>
  </div>
  <div class="col-xs-6"  style={{marginBottom:'10px'}}>
  <p style={{display:'inline', fontSize:'15px', fontFamily:'Montserrat'}}><span class="box" style={{height:'13px', width:'13px', borderRadius:'50%', background:'#1976D2', display:'inline-block'}}></span> Time Spent : {finaltime} s</p>
  </div>
</div>
 </div>)}
}
export default ObjectiveQuestionResult;
