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
      <div>
        <Studentnav />
        <div className="modal fade m-4" id="videoplayer" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Question Solution Video
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {url_link ? (
                  <div className="player-wrapper">
                    <ReactPlayer config={{file: { attributes: { controlsList: "nodownload" } },}} onContextMenu={(e) => e.preventDefault()} controls url={url_link} width="100%"
                    />
                  </div>
                ) : (
                  <div>
                    <h2>Question Has No Solution Video</h2>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-center p-2 m-3">Search Question</h2>

        <div className="row text-center m-3">
          <div className="col-6 col-md-6 text-center">
            {loading ? <ReactLoading type="cylon" color="#09AEE5" /> : ""}
            {Question.length === 0 ? (
              ""
            ) : (
              <button className="btn btn-success" onClick={exportPDFWithComponent}>
                GENERATE PDF
              </button>
            )}

            <form className="form justify-content-center">
              <div className="row d-flex m-4">
                <div className="d-flex col-10 col-md-10 justify-content-center m-4">
                  <input className="form-control justify-content-center" type="search" placeholder="Enter Question Id" value={ques_id} onChange={(e) => setQues(e.target.value)} style={{
                      backgroundColor: "#272C49",
                      color: "#ffffff",
                      borderRadius: "1.4em 1.4em",
                    }} />
                </div>
                <div className="d-flex col-md-2 col-2 text-center justify-content-center m-4">
                  <button className="btn" type="button" onClick={SearchQuestion} style={{
                      backgroundColor: "#EB7926",
                      color: "#ffffff",
                      borderRadius: "1.4em 1.4em",
                    }}>
                        <i className="fas fa-search justify-content-center"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-6 col-md-6 text-center m-4">
            <img src={Logo} style={{ height: "auto", width: "65%" }} />
          </div>

          {question_byId ? (
              <div className="container text-left">
                  <div className='pdf_con'>
                    <div>
                    <br/>
                    <div style={{padding: '1em', marginTop: "4em"}}>
                        <div style={{fontSize: '1.3em'}}><label>Question ID:</label>
                            <label style={{ margin: '0.5em', color: "#EB7926" }}>{question_byId.id}</label></div>
                        <div style={{fontSize: '1.3em'}}><label>Question Text</label>
                            <label>{parse(question_byId.question_text)}</label></div>
                        <div className='row'>
                            <div className='col-lg-12' >
                                {question_byId.correct_option === '1' ?
                                    <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#EB7926", margin: "0.8em" }}>
                                        <label>A {parse(question_byId.option1_text)} </label>
                                    </div>
                                    : <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#dedede", margin: "0.8em" }}>
                                        <label>A {parse(question_byId.option1_text)} </label>
                                    </div>}
                            </div>
                            <div className='col-lg-12'>
                                {question_byId.correct_option === '2' ?
                                    <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#EB7926", margin: "0.8em" }}>
                                        <label>B</label>
                                        {parse(question_byId.option2_text)}
                                    </div>
                                    : <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#dedede", margin: "0.8em" }}>
                                        <label>B</label>
                                        {parse(question_byId.option2_text)}
                                    </div>}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                {question_byId.correct_option === '3' ?
                                    <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#EB7926", margin: "0.8em" }}>
                                        <label>C</label>
                                        {parse(question_byId.option3_text)}
                                    </div>
                                    : <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#dedede", margin: "0.8em" }}>
                                        <label>C</label>
                                        {parse(question_byId.option3_text)}
                                    </div>}
                            </div>
                            <div className='col-lg-12'>
                                {question_byId.correct_option === '4' ?
                                    <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#EB7926", margin: "0.8em" }}>
                                        <label>D</label>
                                        {parse(question_byId.option4_text)}
                                    </div>
                                    : <div style={{padding: '0.8em', borderRadius: '2em', backgroundColor: "#dedede", margin: "0.8em" }}>
                                        <label>D</label>
                                        {parse(question_byId.option4_text)}
                                    </div>}
                            </div>
                        </div><br />
                        <label>Solution Text:</label>
                        <div>{parse(question_byId.solution_text)}</div><br />
                        <label>Difficulty : {question_byId.difficulty_level}</label><br />
                        <label>Level : {question_byId.level_i}</label><br />
                        <label>Created on : {dateFormat(question_byId.created_on)}</label><br /><br />
                        <label>Chapter Name : {question_byId.chapter_name}</label><br /><br />
                        <button className='btn btn-primary' data-toggle="modal" data-target="#videoplayer" onClick={() => viewRecording(question_byId.solution_video)}>View Recording</button>
                    </div>
                    <br />
                    </div>
                </div>
              </div>
          ) : (
            <div className="container text-left">
            {Question.length === 0 ? 'No Questions Found' : <PDFExport paperSize="A3" margin='0.5cm' ref={pdfExportComponent} fileName='Question Details'>
                {Question.map((item) => (
                    <div className='pdf_con'>
                        <br />
                        <div>
                            <div><label>Question ID:</label>
                                <label>{item.id}</label></div>
                            <div><label>Question Text</label>
                                <label>{parse(item.question_text)}</label></div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    {item.correct_option === '1' ?
                                        <div>
                                            <label>Option 1</label>
                                            {parse(item.option1_text)}
                                        </div>
                                        : <div>
                                            <label>Option 1</label>
                                            {parse(item.option1_text)}
                                        </div>}
                                </div>
                                <div className='col-lg-6'>
                                    {item.correct_option === '2' ?
                                        <div>
                                            <label>Option 2</label>
                                            {parse(item.option2_text)}
                                        </div>
                                        : <div>
                                            <label>Option 2</label>
                                            {parse(item.option2_text)}
                                        </div>}
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className='col-lg-6'>
                                    {item.correct_option === '3' ?
                                        <div>
                                            <label>Option 3</label>
                                            {parse(item.option3_text)}
                                        </div>
                                        : <div>
                                            <label>Option 3</label>
                                            {parse(item.option3_text)}
                                        </div>}
                                </div>
                                <div className='col-lg-6'>
                                    {item.correct_option === '4' ?
                                        <div>
                                            <label>Option 4</label>
                                            {parse(item.option4_text)}
                                        </div>
                                        : <div>
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
          )}
        </div>
      </div>
    );
}

export default ListofQuestions_Obj
