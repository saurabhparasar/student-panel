import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Config from '../../config.json'
import parse from 'html-react-parser'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactLoading from 'react-loading';
import dateFormat from 'dateformat';
import ReactPlayer from 'react-player';
import Studentnav from "../studentnav";
import Logo from "../../../src/component/questionlogo.png";

const ListofQuestions_Obj = () => {
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    const [Question, SetQuestion] = useState([])
    const [token, setToken] = useState(data.token)
    const [cls, Setclass] = useState([])
    const [sub, Setsub] = useState([])
    const [sec, Setsec] = useState([])
    const [selectedclass, Setselectedclass] = useState('')
    const [selectedsub, Setselectedsub] = useState('')
    const [selectedchp, Setselectedchp] = useState('')
    const [loading, Setloading] = useState(false)
    const [chp, Setchp] = useState([])
    const [ques_id, setQues] = useState([])
    const [question_byId, setQuestionbyId] = useState('')
    const container = React.useRef(null);
    const [url_link, Seturl] = useState('');
    const pdfExportComponent = React.useRef(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    useEffect(() => {
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        };
        Setloading(true)
        axios.get(Config.SERVER_URL + 'support/get-class/', req)
            .then(response => {
                console.log(response.data)
                const cls = response.data;
                Setclass(cls)
                Setloading(false)
            })
            .catch(error => {
                alert('Server Error')
            });
    }, [])
    function select_class(e) {
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        };
        Setloading(true)
        let class_variable = e.target.value
        console.log(class_variable)
        Setselectedclass(class_variable)
        axios.get(Config.SERVER_URL + 'support/get-subject-class-binding/?class_id=' + class_variable, req) //Subject API
            .then(response => {
                console.log(response.data)
                const sub = response.data;
                console.log(sub);
                Setloading(false)
                Setsub(sub)
            })
            .catch(error => {
                alert('Server Error')
            });
    }
    function select_subject(e) {
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        };
        let Subject_variable = e.target.value;
        Setselectedsub(Subject_variable)
        axios.get(Config.SERVER_URL + 'support/get-chapters/?subject=' + Subject_variable, req)
            .then(response => {
                console.log(response.data)
                const Chapter_data = response.data;
                console.log(Chapter_data);
                Setloading(false)
                Setchp(Chapter_data)
            });
    }
    function select_chapter(e) {
        Setloading(true)
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        };
        let Chapter_variable = e.target.value;
        console.log(Chapter_variable)
        axios.get(Config.SERVER_URL + 'student/get-objective-exam-questions-per-chapter/?chapter=' + Chapter_variable, req) // Questions API
            .then(response => {
                const lang = response.data;
                console.log(lang);
                SetQuestion(lang)
                Setloading(false)
            }).catch((err) => {
                console.log(err)
            })
    }
    function EditQuestion(id, question, option1, option2, option3, option4, solution) {
        window.open(`/support/objectivemodule/ListOfQuestion-Exam/edit/${id}`)
    }
    function SearchQuestion() {
        let req = {
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        };
        console.log(ques_id)
        axios.get(Config.SERVER_URL + `student/get-objective-question-by-id?id=${ques_id}`, req).then((data) => {
            console.log(data)
            setQuestionbyId(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    function viewRecording(url) {
        Seturl(url)
    }

    return (
        <div style={{backgroundColor: "#FAFAFA"}}>
            <Studentnav />
            <div class="modal fade" id="videoplayer" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Question Solution Video</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {url_link ? <div className='player-wrapper'>
                                <ReactPlayer
                                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    onContextMenu={e => e.preventDefault()}
                                    controls url={url_link} width='100%' />
                            </div> : <div><h2>Question Have No Solution Video</h2></div>}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-2'>
                </div>
                <div className='col-lg-10'>
                    {loading ? <ReactLoading type="cylon" color="#09AEE5" /> : ''}
                    <div style={{ margin: '20px' }}>
                        <div style={{textAlign: "center", marginRight: "280px", marginBottom: "50px" }}>
                            <h2>Search Questions</h2>
                        </div>
                        {/* <p>Total Number of Questions : {Question.length}</p> */}
                        {Question.length === 0 ? '' : <button className="btn btn-success" onClick={exportPDFWithComponent}>
                            GENERATE PDF
                        </button>}
                        <div className='row'>
                            {/* <div className='col-lg-6'>
                                <label>Select class</label>
                                <select class="form-control" onChange={select_class} required>
                                    <option value='0'>Select</option>
                                    {cls.map((item) => (<option value={item.id}>{item.class_name}</option>
                                    ))};
                                </select>
                            </div> */}
                            {/* <div className='col-lg-6'>
                                <label>Subject</label>
                                <select class="form-control" onChange={select_subject} required>
                                    <option value='0'>Select subject</option>
                                    {sub.map((item) => (<option value={item.id}>{item.subject_name}</option>
                                    ))};
                                </select>
                            </div> */}
                        </div>
                        <div className='row'>
                            {/* <div className='col-lg-6'>
                                <label> Select chapter</label>
                                <select class="form-control" onChange={select_chapter}>
                                    <option value='0'>Select</option>
                                    {chp.map((item) => (<option value={item.id}>{item.chapter_name}</option>
                                    ))};
                                </select>
                            </div> */}
                            {/* <div className='col-lg-6'>
                                <label>Enter Question Id</label>
                                <input type='text' className='form-control' placeholder='Search By Question Id' value={ques_id} onChange={(e) => setQues(e.target.value)} /><br />
                                <button className='btn btn-deep-orange' onClick={SearchQuestion}>Submit</button>
                            </div> */}
                            <div className="input-group mb-3">
                                <div className="row" style={{display: 'flex'}}>
                                    <input className="form-control" placeholder="Enter Question Id" style={{borderBottomLeftRadius: "25px", borderTopLeftRadius: "25px", backgroundColor: "#272C49", color: "white", padding: "22px"}} value={ques_id} onChange={(e) => setQues(e.target.value)}  />
                                    <div className="col-sm-3 input-group-append">
                                        <button className="btn btn-outline-secondary btn-lg" style={{borderBottomRightRadius: "25px", borderTopRightRadius: "25px", backgroundColor: "#EB7926", color:"#ffffff"}} type="button" onClick={SearchQuestion}><i class="fas fa-search"></i></button>
                                    </div>
                                    {/* <img src={Logo} style={{height: "auto", width: "376px", marginLeft: "300px"}} /> */}
                                 </div>
                            </div>
                        </div>
                        {question_byId ? <div>
                            <div className='pdf_con'>
                              <div style={{marginLeft: "10px"}}>
                                <br />
                                <div style={{ width: '70%', height: 'auto', padding: '10px', marginTop: "50px", marginLeft: "90px" }}>
                                    <div style={{ fontSize: '20px' }}><label>Question ID:</label>
                                        <lable style={{ margin: '10px', color: "#EB7926" }}>{question_byId.id}</lable></div>
                                    <div><label>Question Text</label>
                                        <label>{parse(question_byId.question_text)}</label></div>
                                    <div className='row'>
                                        <div className='col-lg-12' >
                                            {question_byId.correct_option === '1' ?
                                                <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#EB7926", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }} >
                                                    <label>A</label>
                                                    {parse(question_byId.option1_text)}
                                                </div>
                                                : <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#DEDEDE", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>A</label>
                                                    {parse(question_byId.option1_text)}
                                                </div>}
                                        </div>
                                        <div className='col-lg-12'>
                                            {question_byId.correct_option === '2' ?
                                                <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#EB7926", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>B</label>
                                                    {parse(question_byId.option2_text)}
                                                </div>
                                                : <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#DEDEDE", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>B</label>
                                                    {parse(question_byId.option2_text)}
                                                </div>}
                                        </div>
                                    </div><br />
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            {question_byId.correct_option === '3' ?
                                                <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#EB7926", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>C</label>
                                                    {parse(question_byId.option3_text)}
                                                </div>
                                                : <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#DEDEDE", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>C</label>
                                                    {parse(question_byId.option3_text)}
                                                </div>}
                                        </div>
                                        <div className='col-lg-12'>
                                            {question_byId.correct_option === '4' ?
                                                <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#EB7926", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>D</label>
                                                    {parse(question_byId.option4_text)}
                                                </div>
                                                : <div style={{padding: '5px', borderRadius: '25px', backgroundColor: "#DEDEDE", paddingLeft: "25px", paddingTop: "12px", margin: "10px" }}>
                                                    <label>D</label>
                                                    {parse(question_byId.option4_text)}
                                                </div>}
                                        </div>
                                    </div><br />
                                    <label style={{fontSize: "20px"}}>Solution Text:</label>
                                    <div style={{color:"#EB7926"}}>{parse(question_byId.solution_text)}</div><br />
                                    <label>Difficulty : {question_byId.difficulty_level}</label><br />
                                    <label>Level : {question_byId.level_i}</label><br />
                                    <label>Created on : {dateFormat(question_byId.created_on)}</label><br /><br />
                                    <label>Chapter Name : {question_byId.chapter_name}</label><br /><br />
                                    <button className='btn btn-primary' data-toggle="modal" data-target="#videoplayer" onClick={() => viewRecording(question_byId.solution_video)} style={{ margin: '20px', backgroundColor: "#272C49" }}>View Recording</button>
                                </div>
                                <br />
                              </div>
                            </div>
                        </div> :
                            <div>
                                {Question.length === 0 ? 'No Questions Found' : <PDFExport paperSize="A3" margin='0.5cm' ref={pdfExportComponent} fileName='Question Details'>
                                    {Question.map((item) => (
                                        <div className='pdf_con'>
                                            <br />
                                            <div style={{ width: '100%', height: 'auto', border: '1px solid black', padding: '10px' }}>
                                                <div style={{ fontSize: '20px' }}><label>Question ID:</label>
                                                    <lable style={{ margin: '10px', color: "orange" }}>{item.id}</lable></div>
                                                <div><label>Question Text</label>
                                                    <label>{parse(item.question_text)}</label></div>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        {item.correct_option === '1' ?
                                                            <div style={{ border: '3px solid green', padding: '5px' }}>
                                                                <label>Option 1</label>
                                                                {parse(item.option1_text)}
                                                            </div>
                                                            : <div style={{ border: '3px solid red', padding: '5px' }}>
                                                                <label>Option 1</label>
                                                                {parse(item.option1_text)}
                                                            </div>}
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        {item.correct_option === '2' ?
                                                            <div style={{ border: '3px solid green', padding: '5px' }}>
                                                                <label>Option 2</label>
                                                                {parse(item.option2_text)}
                                                            </div>
                                                            : <div style={{ border: '3px solid red', padding: '5px' }}>
                                                                <label>Option 2</label>
                                                                {parse(item.option2_text)}
                                                            </div>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        {item.correct_option === '3' ?
                                                            <div style={{ border: '3px solid green', padding: '5px' }}>
                                                                <label>Option 3</label>
                                                                {parse(item.option3_text)}
                                                            </div>
                                                            : <div style={{ border: '3px solid red', padding: '5px' }}>
                                                                <label>Option 3</label>
                                                                {parse(item.option3_text)}
                                                            </div>}
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        {item.correct_option === '4' ?
                                                            <div style={{ border: '3px solid green', padding: '5px' }}>
                                                                <label>Option 4</label>
                                                                {parse(item.option4_text)}
                                                            </div>
                                                            : <div style={{ border: '3px solid red', padding: '5px' }}>
                                                                <label>Option 1</label>
                                                                {parse(item.option4_text)}
                                                            </div>}
                                                    </div>
                                                </div><br />
                                                <label>Solution Text</label>
                                                <div>{parse(item.solution_text)}</div><br />
                                                <label>Difficulty : {item.difficulty_level}</label><br />
                                                <label>Level : {item.level_i}</label><br />
                                                <label>Created on : {dateFormat(item.created_on)}</label><br /><br />
                                                <label>Chapter Name : {item.chapter_name}</label><br /><br />
                                                <button className='btn btn-primary' data-toggle="modal" data-target="#videoplayer" onClick={() => viewRecording(item.solution_video)} style={{ margin: '10px' }}>View Recording</button>
                                                <button className='btn btn-primary' onClick={() => EditQuestion(item.id, item.question_text, item.option1_text, item.option2_text, item.option3_text, item.option4_text, item.solution_text)}>Edit Question</button>
                                            </div>
                                            <br />
                                        </div>
                                    ))}
                                </PDFExport>}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListofQuestions_Obj
