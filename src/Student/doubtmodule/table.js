import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Style from './doubt.module.css';
import Config from '../../config.json';
import axios from 'axios';
import { withRouter } from 'react-router';

class table extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    let studentname = data.username;
    this.state = {
      token: data.token,
      student: studentname,
      books: [],
      isloading: false,
    }
  }
  componentDidMount = () => {
    var requestOptions1 = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
    };
    axios.get(Config.SERVER_URL + 'support/get-books-info/', requestOptions1)
      .then(response => {
        console.log(response.data)
        const ch = response.data;
        this.setState({
          books: ch,
          isloading: false,
        });
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  }
  enterbook = (e) => {
    let variable = e.target.value
    console.log(e.target.value);

    // console.log(e.target.classList.value);
    this.props.history.push(
      {
        pathname: '/student/doubtmodule/chapterlist',
        state: { book_id: variable, },
      }
    )

  }
  render() {
    return (
      <div>
        <div class="container">
          <div className="row" style={{ marginTop: "30px" }}>
            <p className={Style.bookheading}> Related Books</p>

          </div>

          <Row className={Style.tablepad} >
            <center>
              <div className={Style.tableheading}>BOOKS</div>
              <Col md={6}>
                <ul className={Style.unorderlist}>
                  {this.state.books.map((item) => (<li key={item.id} style={{ textAlign: 'left', margin: '20px', cursor: 'pointer', color: '#1C3687', textTranform: 'capitalize', fontWeight: 'bold', fontFamily: 'Montserrat' }} value={item.id} onClick={this.enterbook}>{item.book_name} - {item.author}</li>
                  ))}
                </ul>


              </Col>
            </center>



          </Row>
        </div>
      </div>
    );
  }
}
export default withRouter(table);
