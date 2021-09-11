import { Component } from "react";
class NoteViewer extends Component{
    componentDidMount=()=>{
        if(typeof(this.props.location.state.notes)=='undefined'){
            this.props.history.push('/');
        }
        else{console.log(this.props.location.state.notes.notes_file)}
    }
    render(){
    
        return(<div style={{background:'black', height:'100%auto', textAlign:'center'}}><embed src={this.props.location.state.notes.notes_file+"#toolbar=0"} width="700px" height="620px"/></div>);
    }
}
export default NoteViewer;