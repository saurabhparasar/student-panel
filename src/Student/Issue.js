import React, { Component } from 'react'
import './issue.css'
import image from '../support/Group 18943.png'
export class Issue extends Component {
    render() {
        return (
            <div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <center>
                                    <img src={image} width='100%' />
                                    <div></div><br />
                                    <h4>
                                        We have upgraded to a new version of the website.
                                        You would be able to access all your classes and notes here.
                                        In case you are unable to access any of your past notes, classes, lectures, etc,
                                    </h4>
                                    <h4>please go to <a href='https://class.zinedu.com/' target='_blank' style={{ color: '#010775' }}>class.zinedu.com</a> to access them</h4>
                                    <br />
                                    <h4>Happy Learning !</h4>
                                </center>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='issue_box'>
                    <div className='container'>
                        <div className='inner_box'>
                            <div className='inner_text'>Having Issue with the Website ?</div>
                            <div>
                                <button className='issue_btn' data-toggle="modal" data-target="#exampleModal">Click Here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Issue
