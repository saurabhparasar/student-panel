import { useState, useEffect } from "react"
import React from 'react'
import Navcomp from '../nav';
import axios from 'axios';
import dateFormat from 'dateformat';
import MaterialTable from 'material-table';
import Config from '../config.json';
import Studentnav from './studentnav';
const Objectivetest = (props) => {
  let data = localStorage.getItem("userdetail");
  data = JSON.parse(data);
  const [student, setStudent] = useState(data.username)
  const [student_id, setStudent_id] = useState('')
  const [sectionid, setSection_id] = useState('')
  const [tests, setTests] = useState([])
  const [tests_given, setTests_given] = useState('')
  const [token, setToken] = useState(data.token)
  const [type, setType] = useState('')
  const [alldata, setAlldata] = useState(true)
  const [attempteddata, setAttempteddata] = useState(false)
  const [pendingdata, setPendingdata] = useState(false)
  const [latestdate, setLatestdate] = useState('')


  useEffect(() => {
    console.log(props.location.state.exam_type)
    console.log(props.location.state)
    setType(props.location.state.exam_type)
    var requestOptions = {
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
    };

    axios.get(Config.SERVER_URL + 'users/get-student-details/?username=' + student + '&type=' + props.location.state.exam_type, requestOptions)
      .then(response => {
        let lang = response.data;
        setStudent_id(lang.student_data.id)
        setSection_id(lang.student_data.section_assoc.id)
        console.log(lang);
        // var vars = lang.map((item) => {if(item.exam_assoc.activation_status=="Active")return(item)});
      })
      .catch(error => {
        this.props.history.push("/error");
      });
    axios.get(Config.SERVER_URL + 'student/get-scheduled-objective-exams/?student=' + student + '&type=' + props.location.state.exam_type, requestOptions)
      .then(response => {
        let lang = response.data;
        console.log(lang);
        setTests(lang)
        // var vars = lang.map((item) => {if(item.exam_assoc.activation_status=="Active")return(item)});
      })
      .catch(error => {
        console.log(error)
      });
    axios.get(Config.SERVER_URL + 'student/get-given-objective_exams/?student=' + student + '&type=' + props.location.state.exam_type, requestOptions)
      .then(response => {
        let lang = response.data;
        console.log(lang);
        setTests_given(lang)
      })
      .catch(error => {
        console.log(error)
      });
    return () => {
      setType('')
    }
  }, [props.location.state.exam_type])
  navigator.sayswho = (function () {
    var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();
  function onStartclick(item) {
    if (navigator.sayswho === "Chrome 93" || "Safari 15") {
      props.history.push({
        pathname: "/student/objectiveexaminstruction",
        state: {
          examdetails: item.exam_details,
          exam_type: props.location.state.exam_type
        },
      });
    } else {
      // console.log("hello");
      alert("You are not using Chrome Or Safari browser.Please use chrome browser in android and safari in chrome")
    }
  }
  function onResultclick(item) {
    props.history.push({
      pathname: '/student/objectiveresult/percentileandscore',
      state: {
        exam_id: item.id,
        exam_type: props.location.state.exam_type
      },
    })
  }
  function onResultclickAttempted(item) {
    props.history.push({
      pathname: '/student/objectiveresult/percentileandscore',
      state: { exam_id: item.exam_assoc.id },
    })
  }
  function clickall() {
    setAlldata(true)
    setAttempteddata(false)
    setPendingdata(false)
  }
  function clickattempted() {
    setAlldata(false)
    setAttempteddata(true)
    setPendingdata(false)
  }
  function clickpending() {
    setAlldata(false)
    setAttempteddata(false)
    setPendingdata(true)
  }
  function jeeadvance() {
    window.open(`https://class.zinedu.com/WEBStudent/JEEAdvancePageAccess?StudentReferenceId=${student_id}`)
  }
  var examType;
  if (props.location.state.exam_type == 1) {
    console.log(props.location.state.exam_type)
    examType = (<div>My Test<div style={{ float: 'right' }}>
      {sectionid === 303 ? <button style={{ margin: '10px' }} className='btn btn-danger' onClick={jeeadvance}>CLICK HERE FOR JEE ADVANCE TEST SERIES</button> : ''}
    </div></div>)
  }
  else if (props.location.state.exam_type == 2) {
    console.log(props.location.state.exam_type)
    examType = (<div>My Assignments<div style={{ float: 'right' }}></div></div>)
  }
  else if (props.location.state.exam_type == 3) {
    console.log(props.location.state.exam_type)
    examType = (<div>My Quiz<div style={{ float: 'right' }}></div></div>)
  }
  if (tests_given) {
    var all = [];
    var pending = [];
    {
      tests_given.map((item) => {
        var obj = {};
        obj['id'] = item.exam_assoc.id;
        obj['exam_given'] = "Yes";
        obj['exam_name'] = item.exam_assoc.exam_topic;
        obj['start_date'] = item.exam_assoc.exam_start_date;
        obj['end_date'] = item.exam_assoc.exam_end_date;
        obj['exam_details'] = "";
        obj['attending_status'] = item.attending_status;
        obj['is_expired'] = item.exam_assoc.is_expired
        all.push(obj);
        console.log(dateFormat(new Date(), "d"), 'date')
        console.log(dateFormat(item.exam_assoc.exam_end_date, 'd'))
        // if (Number(dateFormat(item.exam_assoc.exam_end_date, "HH")) - Number(dateFormat(new Date(), "HH")) <= 2) {
        //   console.log('true')
        // } else {
        //   console.log('false')
        // }
        // console.log(item.exam_assoc.exam_end_date)
        // console.log(new Date().getHours(), 'dcgbu')
        // var a = new Date()
        // console.log(a.getHours(),'hours')
        // console.log(dateFormat(a, "dddd, mmmm dS, yyyy, h:MM:ss TT"))
        // console.log(dateFormat(item.exam_assoc.exam_end_date, "dddd, mmmm dS, yyyy, h:MM:ss TT"))
        // if (dateFormat(a, "dddd, mmmm dS, yyyy, h:MM:ss TT") === dateFormat(item.exam_assoc.exam_end_date, "dddd, mmmm dS, yyyy, h:MM:ss TT")) {
        //   console.log(true, 'true')
        // }
      })
      console.log(all, 'duh')
    }
    {
      tests.map((item) => {
        if (!all.find(e => e.id == item.exam_assoc.id)) {
          var obj = {};
          obj['id'] = item.exam_assoc.id;
          obj['exam_given'] = "No";
          obj['exam_name'] = item.exam_assoc.exam_topic;
          obj['start_date'] = item.exam_assoc.exam_start_date;
          obj['end_date'] = item.exam_assoc.exam_end_date;
          obj['exam_details'] = item;
          obj['attending_status'] = "";
          obj['is_expired'] = item.exam_assoc.is_expired
          all.push(obj);
          pending.push(obj);
        }
      })
    }
    // all.sort((a,b)=> {
    //   let da = new Date(a.start_date);
    //   let db = new Date(b.start_date);
    //   return db - da;
    // });
  }
  console.log(tests_given)
  function updatechrome() {
    window.open('https://www.google.com/chrome/?brand=JJTC&gclid=CjwKCAjw-sqKBhBjEiwAVaQ9a9BWl1iR9tK1c9dpnitlVDayYDWZz-8TX7q2thTBt_2wWju08CHphRoC5mcQAvD_BwE&gclsrc=aw.ds')
  }
  return (
    <div>
      <Studentnav /><br /><br />
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              "You are not using Chrome Or Safari browser.Please use chrome browser in android and safari in chrome"
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={updatechrome}>Update Chrome</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        {alldata ? <div>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#292E42', marginTop: '60px' }}>{examType}</p>
          <div class="row" style={{ margin: '40px 0px 0px 0px' }}>
            <div onClick={clickall} class="col-xs-4" style={{ cursor: 'pointer', background: '#272C49', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderTopLeftRadius: '5px' }}>
              <button onClick={clickall} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}>  <p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>All</p></button>
            </div>
            <div onClick={clickattempted} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0' }}>
              <button onClick={clickattempted} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}>  <p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>Attempted</p></button>
            </div>
            <div onClick={clickpending} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderTopRightRadius: '5px' }}>
              <button onClick={clickpending} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}>  <p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>Pending</p></button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <MaterialTable style={{ position: 'sticky', borderBottom: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
                title="List Of All Exams"
                columns={[
                  { title: 'Sr. No.', field: 'id', width: '10%' },
                  { title: 'Test Name', field: 'exam_name' },
                  { title: 'Start Date/Time', field: 'start_date', render: rowData => <div>{dateFormat(rowData.start_date, "d/m/yyyy, h:MM:ss TT")}</div> },
                  { title: 'End Date/Time', field: 'end_date', render: rowData => <div>{dateFormat(rowData.end_date, "d/m/yyyy,h:MM:ss TT")}</div> },
                  {
                    title: '', field: 'Action', render: rowData => <div>{rowData.exam_given === undefined || rowData.exam_given == 'No'
                      ?
                      <div>  <button type="button" className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '19px', fontFamily: 'Montserrat', color: 'white', fontSize: '15px' }} onClick={() => { onStartclick(rowData) }} >Start</button></div> : <div>{rowData.exam_given == 'Yes' ? <div></div> : 'Comming Soon'}</div>
                    }</div>
                  },
                  // {title: '', field: 'Check', render: rowData => <div>{rowData.exam_given=="Yes"?(<div></div>):(<div></div>)}</div>},
                  // <div>  <button type="button" className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '19px', fontFamily: 'Montserrat', color: 'white', fontSize: '15px' }} onClick={() => { onStartclick(rowData) }} >Start</button></div>
                  {
                    title: '', field: 'Action', render: rowData => <div>{props.location.state.exam_type == 1 ?
                      <div>
                      </div> : <div>
                        <div>{rowData.attending_status == "LateSubmission" ? (<div><p style={{ color: '#FF1100', fontSize: '16px', fontFamily: 'Montserrat' }}>Late Submission</p></div>) : (<div></div>)}</div>
                      </div>
                    }
                    </div>
                  },
                  {
                    title: 'Result', field: '', render: rowData => <div> {
                      props.location.state.exam_type == 1 ? <div>
                        <div>{rowData.is_expired && rowData.exam_given === "Yes" ? <div>
                          <img onClick={() => { onResultclick(rowData) }} src={process.env.PUBLIC_URL + '/test 1.png'} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                        </div> : <div>{rowData.exam_given == "Yes" ? <div>Result will be declared on {dateFormat(rowData.end_date, "d/m/yyyy,h:MM:ss TT")}</div> : ''}</div>}</div>
                      </div> : <div>
                        <div>{rowData.exam_given == "Yes" ? (<div>
                          <img onClick={() => { onResultclick(rowData) }} src={process.env.PUBLIC_URL + '/test 1.png'} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                        </div>) : (<div></div>)}</div>
                      </div>
                    }</div>
                  },
                ]}
                data={all}
                options={{
                  headerStyle: {
                    backgroundColor: ' #E1E1E1',
                    color: '#272C49',
                    fontSize: '16px',
                    fontWeight: 'Montserrat',
                  },
                  toolbar: false,
                  search: false,
                  sorting: true,
                }}
              />
              <br />
            </div>
          </div>
        </div> : ''}
        {attempteddata ? <div>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#292E42', marginTop: '60px' }}>{examType}</p>
          <div class="row" style={{ margin: '40px 0px 0px 0px' }}>
            <div onClick={clickall} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderTopLeftRadius: '5px' }}>
              <button onClick={clickall} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}><p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>All</p></button>
            </div>
            <div onClick={clickattempted} class="col-xs-4" style={{ cursor: 'pointer', background: '#272C49', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0' }}>
              <button onClick={clickattempted} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}><p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>Attempted</p></button>
            </div>
            <div onClick={clickpending} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderTopRightRadius: '5px' }}>
              <button onClick={clickpending} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}><p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>Pending</p></button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <MaterialTable style={{ position: 'sticky', borderBottom: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
                title="List Of All Exams"
                columns={[
                  { title: 'Sr. No.', field: 'exam_assoc.id', width: '10%' },
                  { title: 'Test Name', field: 'exam_assoc.exam_topic' },
                  { title: 'Start Date/Time', field: 'exam_start_time', render: rowData => <div>{dateFormat(rowData.exam_assoc.exam_start_date, "d/m/yyyy, h:MM:ss TT ")}</div> },
                  { title: 'End Date/Time', field: 'exam_end_time', render: rowData => <div>{dateFormat(rowData.exam_assoc.exam_end_date, "d/m/yyyy,h:MM:ss TT ")}</div> },
                  // { title: '', field: 'Action', render: rowData => <div>  <button type="button" className="btn" style={{background:'#1C3687',border:'none', borderRadius:'19px',fontFamily:'Montserrat', color:'white', fontSize:'15px' }} onClick={()=>{this.onStartclick(rowData)}} >Take Exam</button></div>},
                  {
                    title: '', field: 'Action', render: rowData => <div>{props.location.state.exam_type == 1 ?
                      <div>
                      </div> : <div>
                        <div>{rowData.attending_status == "LateSubmission" ? (<div><p style={{ color: '#FF1100', fontSize: '16px', fontFamily: 'Montserrat' }}>Late Submission</p></div>) : (<div></div>)}</div>
                      </div>
                    }
                    </div>
                  },
                  {
                    title: 'Result', field: 'Action', render: rowData => <div>
                      {props.location.state.exam_type == 1 ? <div>
                        {String(rowData.exam_assoc.is_expired) === 'true' ? <div>
                          <img onClick={() => { onResultclickAttempted(rowData) }} src={process.env.PUBLIC_URL + '/test 1.png'} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                        </div> : <div>
                          Result will be declared on {dateFormat(rowData.exam_assoc.exam_end_date, "d/m/yyyy,h:MM:ss TT ")}
                        </div>}
                      </div> : <div>
                        <img onClick={() => { onResultclickAttempted(rowData) }} src={process.env.PUBLIC_URL + '/test 1.png'} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                      </div>} </div>
                  },
                ]}
                data={tests_given}
                options={{
                  headerStyle: {
                    backgroundColor: ' #E1E1E1',
                    color: '#272C49',
                    fontSize: '16px',
                    fontWeight: 'Montserrat',
                  },
                  toolbar: false,
                  search: false,
                  sorting: true,
                }}

              />
              <br />
            </div>
          </div>
        </div> : ''}
        {pendingdata ? <div>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#292E42', marginTop: '60px' }}>{examType}</p>
          <div class="row" style={{ margin: '40px 0px 0px 0px' }}>

            <div onClick={clickall} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderTopLeftRadius: '5px' }}>
              <button onClick={clickall} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}><p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>All</p></button>
            </div>
            <div onClick={clickattempted} class="col-xs-4" style={{ cursor: 'pointer', background: '#FFFFFF', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0' }}>
              <button onClick={clickattempted} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}><p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#272C49' }}>Attempted</p></button>
            </div>
            <div onClick={clickpending} class="col-xs-4" style={{ cursor: 'pointer', background: '#272C49', padding: '10px 0px 0px 20px', borderTop: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderTopRightRadius: '5px' }}>
              <button onClick={clickpending} style={{ border: 'none', padding: '0px', margin: '0px', background: 'none' }}>  <p style={{ fontSize: '2.3vw', fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>Pending</p></button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <MaterialTable style={{ position: 'sticky', borderBottom: '1px solid #B1B6C0', borderLeft: '1px solid #B1B6C0', borderRight: '1px solid #B1B6C0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
                title="List Of All Exams"
                columns={[
                  { title: 'Sr. No.', field: 'id', width: '10%' },
                  { title: 'Test Name', field: 'exam_name' },
                  { title: 'Start Date/Time', field: 'start_date', render: rowData => <div>{dateFormat(rowData.start_date, "d/m/yyyy, h:MM:ss TT ")}</div> },
                  { title: 'End Date/Time', field: 'end_date', render: rowData => <div>{dateFormat(rowData.end_date, "d/m/yyyy,h:MM:ss TT ")}</div> },
                  { title: '', field: 'Action', render: rowData => <div>  <button type="button" className="btn" style={{ background: '#1C3687', border: 'none', borderRadius: '19px', fontFamily: 'Montserrat', color: 'white', fontSize: '15px' }} onClick={() => { onStartclick(rowData) }} >Start</button></div> },
                ]}
                data={pending}
                options={{
                  headerStyle: {
                    backgroundColor: ' #E1E1E1',
                    color: '#272C49',
                    fontSize: '16px',
                    fontWeight: 'Montserrat',
                  },
                  toolbar: false,
                  search: false,
                  sorting: true,
                }}

              />
              <br />
            </div>
          </div>
        </div> : ''}
      </div>
    </div>
  )
}
export default Objectivetest
