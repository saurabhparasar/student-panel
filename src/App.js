import { Component } from 'react';
import ErrorPage from './errorpage';
import FrontLand from './land/land';
import Whoweare from './land/whoweare';
import Blankpage from './blank';
import Landing from './landing/landing';
import CustomerURL from './School/feesmodule/customerurl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Miscllenous
import ZestResults from './Miscllenous/ZestResults.js';
import SearchQuestion from './Student/doubtmodule/SearchQuestion';
//Permission

//-------------------------------Student module pages
import Student from './Student/student';
import ResetPassword from './Student/resetpassword';
//feeportal
import Feeportal from './Student/Feeportal';
import PayNow from './Student/PayNow';
import Installment from './Student/installments';
//objectivemodule
import Objectivetest from './Student/objectivetest';
import ObjectiveExamInstruction from './Student/objectiveexaminstruction';
import Objectiveexam from './Student/objectiveexam';
import ObjectiveExamComplete from './Student/objectiveexamcomplete.js'
//objectiveexamresult
import PercentileAndScore from './Student/objective result/PercentileAndScore.js';
import DifficultyLevelWiseScore from './Student/objective result/DifficultyLevelWiseScore.js';
import TimePerQuestion from './Student/objective result/TimePerQuestion.js';
import SolutionsObjectiveResult from './Student/objective result/Solutions.js';
import ChapterWiseScore from './Student/objective result/ChapterWiseScore.js';
//liveclass
import PastLiveClass from './Student/live class/PastLiveClass.js';
import UpcomingLiveClass from './Student/live class/UpcomingLiveClass.js';

import PastLiveClassStudent from './Student/pastrecordings/PastLiveClass';

//assignment module
import StudentAssignment from './Student/studentassignment';
import AssignmentSubmit from './Student/AssignmentSubmit';
import SubmittedAssignment from './Student/SubmitedAssignment';
import UpdateSubmittedAssignment from './Student/UpdateSubmittedAssignment';
//video module
import VideoLectures from './Student/videomodule';
import SubjectVideoLands from './Student/subjectvideosland';
import VideoPlayer from './Student/videoplayer';
//doubtmodule
import StudentDoubt from './Student/doubtmodule/studentdoubt';
import DoubtSolution from './Student/doubtmodule/doubtsolution';
import UploadDoubtStudent from './Student/doubtmodule/UploadDoubt.js';
import ListOfChaptersStudentDoubt from './Student/doubtmodule/ListOfChapters.js';
import ListOfQuestionsStudentDoubt from './Student/doubtmodule/ListOfQuestions.js';
import QuestionDetailsStudentDoubt from './Student/doubtmodule/QuestionDetails.js'
import PendingDoubts from './Student/doubtmodule/PendingDoubts.js';
//notes
import NotesSubjects from './Student/notes/NotesSubjects.js';
import NotesChapters from './Student/notes/NotesChapters.js';
import ListOfNotes from './Student/notes/ListOfNotes.js';
import ReadNotes from './Student/readnotes';
import ReadSubjectNotes from './Student/readsubjectnotes';
import NoteViewer from './Student/noteviewer';
//profile
import Profile from './Student/profile/Profile.js';
import ChangePassword from './Student/profile/ChangePassword.js';
//feemodule
import InstallmentPageStudent from './Student/feemodule/InstallmentPage.js';
import PaymentStudent from './Student/feemodule/Payment.js';
import PaymentStatusStudent from './Student/feemodule/PaymentStatus.js';
import { ProtectedRoute } from "./protected";
import Mobile from './ForgotPassword/Mobile'
import Password from './ForgotPassword/Password'
import Feesummary from './Student/Feesummary';
import jeepage from './landing/Jeepage';
import Myschedule from './Student/Myschedule';
import AssignmentsList_student from '../src/Student/assignments/AssignmentsList_Student'
import AssignmetsSubjects from '../src/Student/assignments/AssignmentsSubjects'
import AssignmentsChapters from '../src/Student/assignments/AssignmentsChapters'
import StudyMaterialSubject from './Student/StudyMaterial/StudyMaterialSubject';
import StudyMaterial_List from './Student/StudyMaterial/StudyMaterial_List';
import Payment_successPage from './component/Payment_successPage';
import StudentObjectiveTest from './Student/StudentObjectiveTest';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} value="Landing" />
            <Route exact path="/jee_advance_crash_course" component={jeepage} value="Landing" />
            <Route exact path="/student/PaymentSuccess" component={Payment_successPage} value="Landing" />

            <Route exact path="/error" component={ErrorPage} />
            {/* <Route exact path="/login" component={Landing} /> */}
            <Route exact path="/forgotPassword" component={Mobile} />
            <Route exact path="/ChoosePassword" component={Password} />
            <Route exact path="/whoweare" component={Whoweare} />
            <Route exact path="/blankpage" component={Blankpage} />
            <Route exact path="/student/doubtmodule/SearchQuestion" component={SearchQuestion}/>
            <Route exact path='/parentpayment/:orderid/:installmentid' component={CustomerURL} />
            <Route exact path='/izest/result' component={ZestResults} />
            <Route exact path='/pastrecordings/:student_id' component={PastLiveClassStudent} />
            <ProtectedRoute exact path="/student" component={Student} value="Student" />
            <ProtectedRoute exact path="/student/resetpassword" component={ResetPassword} value="Student" />

            <ProtectedRoute exact path="/student/assignment" component={StudentAssignment} value="Student" />
            <ProtectedRoute exact path="/student/submitassignment" component={AssignmentSubmit} value="Student" />
            <ProtectedRoute exact path="/student/submittedassignment" component={SubmittedAssignment} value="Student" />
            <ProtectedRoute exact path="/student/updateassignment" component={UpdateSubmittedAssignment} value="Student" />
            <ProtectedRoute exact path="/student/StudyMaterialSubject" component={StudyMaterialSubject} value="Student" />
            <ProtectedRoute exact path="/student/StudyMaterialList" component={StudyMaterial_List} value="Student" />

            <ProtectedRoute exact path="/student/videolectures" component={VideoLectures} value="Student" />
            <ProtectedRoute exact path="/student/subjectvideos" component={SubjectVideoLands} value="Student" />
            <ProtectedRoute exact path="/student/videoplayer" component={VideoPlayer} value="Student" />

            <ProtectedRoute exact path="/student/readsubjectnotes" component={ReadSubjectNotes} value="Student" />
            <ProtectedRoute exact path="/student/readnotes" component={ReadNotes} value="Student" />
            <ProtectedRoute exact path="/student/notes" component={NoteViewer} value="Student" />

            <ProtectedRoute exact path="/student/askyourdoubt" component={StudentDoubt} value="Student" />
            <ProtectedRoute exact path="/student/doubtsolutions" component={DoubtSolution} value="Student" />
            <ProtectedRoute exact path="/student/doubtmodule/uploaddoubt" component={UploadDoubtStudent} value="Student" />
            <ProtectedRoute exact path="/student/doubtmodule/chapterlist" component={ListOfChaptersStudentDoubt} value="Student" />
            <ProtectedRoute exact path="/student/doubtmodule/questionlist" component={ListOfQuestionsStudentDoubt} value="Student" />
            <ProtectedRoute exact path="/student/doubtmodule/questiondetails" component={QuestionDetailsStudentDoubt} value="Student" />
            <ProtectedRoute exact path="/student/doubtmodule/pendingdoubts" component={PendingDoubts} value="Student" />


            <ProtectedRoute exact path="/student/objectivetest" component={Objectivetest} value="Student" />
            <ProtectedRoute exact path="/student/StudentObjectiveTest" component={StudentObjectiveTest} value="Student" />
            <ProtectedRoute exact path="/student/objectiveexaminstruction" component={ObjectiveExamInstruction} value="Student" />
            <ProtectedRoute exact path="/student/objectiveexam" component={Objectiveexam} value="Student" />
            <ProtectedRoute exact path="/student/objectiveexamcomplete" component={ObjectiveExamComplete} value="Student" />
            <ProtectedRoute exact path="/student/objectiveresult/percentileandscore" component={PercentileAndScore} value="Student" />
            <ProtectedRoute exact path="/student/objectiveresult/difficultylevelwisescore" component={DifficultyLevelWiseScore} value="Student" />
            <ProtectedRoute exact path="/student/objectiveresult/timeperquestion" component={TimePerQuestion} value="Student" />
            <ProtectedRoute exact path="/student/objectiveresult/solutions" component={SolutionsObjectiveResult} value="Student" />
            <ProtectedRoute exact path="/student/objectiveresult/chapterwisescore" component={ChapterWiseScore} value="Student" />

            <ProtectedRoute exact path="/student/liveclass/pastliveclass" component={PastLiveClass} value="Student" />
            <ProtectedRoute exact path="/student/liveclass/upcomingliveclass" component={UpcomingLiveClass} value="Student" />

            <ProtectedRoute exact path="/student/notes/notessubjects" component={NotesSubjects} value="Student" />
            <ProtectedRoute exact path="/student/notes/noteschapters" component={NotesChapters} value="Student" />
            <ProtectedRoute exact path="/student/notes/noteslist" component={ListOfNotes} value="Student" />

            <ProtectedRoute exact path="/student/payment" component={Feeportal} value="Student" />
            <ProtectedRoute exact path="/student/payment/installment" component={Installment} value="Student" />
            <ProtectedRoute exact path="/student/payment/paynow" component={PayNow} value="Student" />
            <ProtectedRoute exact path="/student/profile" component={Profile} value="Student" />
            <ProtectedRoute exact path="/student/feesummary" component={Feesummary} value="Student" />

            <ProtectedRoute exact path="/student/changepassword" component={ChangePassword} value="Student" />

            <ProtectedRoute exact path="/student/feemodule/installmentpage" component={InstallmentPageStudent} value="Student" />
            <ProtectedRoute exact path="/student/feemodule/payment" component={PaymentStudent} value="Student" />
            <ProtectedRoute exact path="/student/feemodule/paymentstatus/:status" component={PaymentStatusStudent} value="Student" />
            <ProtectedRoute exact path="/student/Myschedule" component={Myschedule} value="Student" />
            <ProtectedRoute exact path="/student/assignmentslist" component={AssignmentsList_student} value="Student" />
            <ProtectedRoute exact path="/student/assignmentssubjects" component={AssignmetsSubjects} value="Student" />
            <ProtectedRoute exact path="/student/assignmentschapters" component={AssignmentsChapters} value="Student" />
            <Route exact path='*' component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
