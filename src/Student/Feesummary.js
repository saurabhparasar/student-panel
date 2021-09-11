import React, { Component } from 'react'
import Studentnav from './studentnav'
import axios from "axios";
import Config from '../config.json';
import dateFormat from 'dateformat';
export class Feesummary extends Component {
    constructor() {
        super()
        let data = localStorage.getItem("userdetail");
        data = JSON.parse(data);
        this.state = {
            token: data.token,
            student: data.username,
            student_installment_plan: [],
            requestOptions: null,
            student_details: '',
            sectionId: '',
            schoolId: '',
            installment_id: '',
            student_details: [],
            reason: '',
            genre: '',
            count: 0,
            status: ''
        }
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            },
        };
        this.setState({
            requestOptions: req
        })
    }
    componentDidMount() {
        axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + this.state.student, this.state.requestOptions).then((data) => {
            console.log(data.data)
            this.setState({
                student_details: data.data,
                sectionId: data.data.student_data.section_assoc.id,
                schoolId: data.data.student_data.school_assoc.id
            })
            axios.get(`https://ap.zinedu.com/payment/get-section-installment-plans/?section=${data.data.student_data.section_assoc.id}&school=${data.data.student_data.school_assoc.id}`).then((data) => {
                console.log(data.data)
                data.data.map((item) => {
                    this.setState({
                        installment_id: data.data[0].id,
                    })
                })
            }).catch((err) => {
                alert('Server Error')
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
        axios.get(`https://ap.zinedu.com/users/get-student-installments/?student_username=` + this.state.student).then((data) => {
            console.log('Installment data', data.data)
            console.log(data.data.length, 'data lrn')
            if (data.data.length > 0) {
                this.setState({
                    student_installment_plan: data.data,
                })
            }
            this.setState({
                loading: false
            })

        }).catch((err) => {
            console.log(err)
            alert('err')
        })
    }
    paytmLinkHandler = (id) => {
        console.log(id)
        let formdata = new FormData()
        formdata.append('payment_type', 'Link')
        formdata.append('installment_plan_id', id)
        axios.post('https://ap.zinedu.com/payment/collect-payment-support/', formdata, this.state.requestOptions).then((data) => {
            console.log(data)
            if (data.data.payment_link) {

            }
            this.setState({
                link: 'https://main.zinedu.com' + data.data.payment_link
            })
            window.open('https://main.zinedu.com' + data.data.payment_link)
        }).catch((err) => {
            console.log(err)
        })
    }
    Report = () => {
        console.log(this.state.student_details)
        let formdata = new FormData()
        formdata.append('student', this.state.student_details.student_data.id)
        formdata.append('report_reason', this.state.reason)
        formdata.append('genre', this.state.genre)
        formdata.append('status', this.state.status)
        axios.post(Config.SERVER_URL + `users/post-student-report-request/`, formdata, this.state.requestOptions).then((data) => {
            console.log(data)
            this.setState({
                count: 1
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    Reportchange = (e) => {
        const data = e.target.value
        console.log(data)
        this.setState({
            reason: data
        })
    }
    render() {
        return (
            <div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Report a Problem</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.state.count === 1 ? <p style={{ color: 'green' }}>
                                    Report Message Posted
                                </p> : ''}
                                <label>Enter Report Reason</label>
                                <textarea style={{ width: '100%' }} onChange={this.Reportchange}></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.Report}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Studentnav />
                <div className='container'>
                    <h3>Fee Summary</h3><br /><br />
                    <button className='btn btn-danger' data-toggle="modal" data-target="#exampleModal">Report Problem</button><br /><br />
                    <table style={{
                        width: '100%',
                        border: '1px solid black'
                    }}>
                        <thead style={{
                            border: '1px solid black',
                        }}>
                            <th style={{ padding: '10px' }}>S.No</th>
                            <th>Amount Payable</th>
                            <th>Due Date</th>
                            <th>Fee Status</th>
                            <th>Action</th>
                        </thead>
                        {this.state.student_installment_plan.map((item, index) => (
                            <tr style={{
                                padding: '10px'
                            }}>gg
                                <td style={{ padding: '10px' }}>{index + 1}</td>
                                <td>{item.amount_payable}</td>
                                <td>{dateFormat(item.validity_end_date, 'dddd, mmmm d, yyyy')}</td>
                                <td>{item.status}</td>
                                <td>
                                    {item.status === 'Unpaid' ?
                                        <button className='btn' onClick={() => this.paytmLinkHandler(item.id)} style={{ backgroundColor: '#EB7926', color: 'white' }}>Pay Now</button> : <div>{item.fee_paid_on}</div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}

export default Feesummary
