import { Component } from "react";
import StudentSearch from "./form";
import Studentnav from "../studentnav";
import Footer from "../Footer";
import "./doubt-module-container.css"

class UploadDoubtStudent extends Component {
  onPendingDoubt = () => {
    this.props.history.push({
      pathname: "/student/doubtmodule/pendingdoubts",
    });
  };
  render() {
    return (
      <>
        <Studentnav />
        <div className="doubt-module-container">
          <div className="doubt-module-title">
            <div></div>
            <div className="view-doubts" onClick={this.onPendingDoubt}>
              <p>View Pending Doubts</p>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <StudentSearch history={this.props.history} />
        </div>
        <Footer />
      </>
    );
  }
}

export default UploadDoubtStudent;
