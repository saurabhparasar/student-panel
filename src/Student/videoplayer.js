import { Component } from 'react';
import axios from 'axios';
import Studentnav from './studentnav';
import Styles from './studentnav.module.css';
import ReactPlayer from 'react-player';
class VideoPlayer extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    let studentname = data.username;
    this.state = {
      token: data.token,
      student: studentname,
      playingvideo: '',
      relatedvideo: [],
      isloading: false,
      playbackrate: 1.0,
    }
  }
  Logout = () => {
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount = () => {
    let sub = this.props.location.state.video;
    this.setState({
      playingvideo: sub.lecture_video,
    })
  }
  setplayback = (e) => {
    let variable = e.target.value;
    this.setState({
      playbackrate: variable,
    })
  }


  render() {

    return (
      <div style={{ background: 'black', height: '100vh' }}>
        <Studentnav />
        <div class="container">
          <br />
          <center>
            <ReactPlayer
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              onContextMenu={e => e.preventDefault()}
              playbackRate={this.state.playbackrate}
              controls url={this.state.playingvideo} width='80%' />

          </center>
          <br />
          <label style={{ color: 'white' }}>Speed:</label>
          <select class="form-control" style={{ width: '150px' }} onChange={this.setplayback}>
            <option value={1.0}>1x</option>
            <option value={0.5}>0.5x</option>
            <option value={1.5}>1.5x</option>
            <option value={2.0}>2x</option>
          </select>
        </div>
      </div>

    );
  }
}
export default VideoPlayer;