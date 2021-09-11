import {Component} from 'react';
import parse from 'html-react-parser';
import Styles from './studentdashboard.module.css';

class ObjectiveQuestion extends Component{
  constructor(props) {
    super(props);
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


    return(<div id={Styles.objectivequestion}>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'20px', borderBottom:'1px solid #BEC5D3', overflow:'auto'}}>
      <p style={{fontSize:'18px', fontFamily:'Montserrat', fontWeight:'bold', marginBottom:'20px'}}>Q{this.props.index+1}.         {parse(this.props.testing.question_assoc.question_text)}</p>

      </div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'20px', paddingLeft:'0px', paddingRight:'0px'}}>
      {this.props.testing.ans_given === '1'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option1_text)}
 <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='1'
                                     checked={this.props.testing.ans_given === '1'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>1</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option1_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='1'
                                            checked={this.props.testing.ans_given === '1'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>1</span></label> </div>)}


      </div>
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.ans_given === '2'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option2_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='2'
                                     checked={this.props.testing.ans_given === '2'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>2</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option2_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='2'
                                            checked={this.props.testing.ans_given === '2'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>2</span></label> </div>)}

      </div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.ans_given === '3'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option3_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='3'
                                     checked={this.props.testing.ans_given === '3'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>3</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option3_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='3'
                                            checked={this.props.testing.ans_given === '3'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>3</span></label> </div>)}

      </div>
      <div className="col-md-12" style={{marginTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>

      {this.props.testing.ans_given === '4'?(<div style={{padding:'5px 0px 2px 20px', background:'#EB7926'}}><label id={Styles.radiocontainerselected}>{parse(this.props.testing.question_assoc.option4_text)}
      <input type="radio" class={Styles.noncheckedradio}
      name={this.props.testing.id}
                                      id={this.props.testing.id}
                                     value='4'
                                     checked={this.props.testing.ans_given === '4'}
                                     onChange={this.props.onChange} required />
             <span class={Styles.checkmarkselected}>4</span></label> </div>):(<div style={{padding:'5px 0px 2px 20px'}}><label id={Styles.radiocontainer}>{parse(this.props.testing.question_assoc.option4_text)}
        <input type="radio" class={Styles.noncheckedradio}
             name={this.props.testing.id}
                                             id={this.props.testing.id}
                                            value='4'
                                            checked={this.props.testing.ans_given === '4'}
                                            onChange={this.props.onChange} required />
                    <span class={Styles.checkmark}>4</span></label> </div>)}

      </div>
    </div>

 </div>)}
}
export default ObjectiveQuestion;
