import { Component } from 'react';
import Config from './config.json';

class ErrorPage extends Component {
    constructor() {
        super();
        let data = localStorage.getItem("userdetail");
        data = JSON.parse(data);
        this.state = {
            token: data.token,
        }
    }
    Logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }
    componentDidMount = () => {
        var formdata = new FormData();
        formdata.append('page_name', 'error-page');
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
                'Authorization': 'Token ' + this.state.token
            },
        };
        fetch(Config.SERVER_URL + 'users/post-analytics/', requestOptions)
            .then(response => {
                response.json()
                if (response.status == 401) {
                    this.Logout();
                }
            })
            .then(json => {
                console.log(json);
                this.props.history.push('/');
            })
            .catch(error => {
                this.props.history.push('/');
            });

    }
    render() {
        return (
            <div>
                AWW! Snap Something went wrong Check your connection or try again later!!
                <button className='btn btn-primary' onClick={this.Logout}>Logout</button>
            </div>
        )
    }
}
export default ErrorPage;
