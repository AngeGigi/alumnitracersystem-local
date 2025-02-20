import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import {BrowserRouter, Routes, Route} from "react-router-dom"


{/* for Client path */}
import FrontPage from '../src/client/components/Frontpage/frontpage';
import CrossCheckSurveyForm from '../src/client/components/CrossCheck-Survey/CrossCheck-Survey';
import Home from '../src/client/components/Home/home'
import SurveyPage from '../src/client/components/Surveys/SurveyPage';
import Events from '../src/client/components/Events/events';
import JobPage from '../src/client/components/JobPage/jobpage';
import JobPageGive from '../src/client/components/JobPageGive/jobpagegive';
import AddJobForm from '../src/client/components/JobPageGive/addjobForm';
import JobPageList from '../src/client/components/JobPageList/jobpagelist';
import Contact from '../src/client/components/Contact/contact';
import Profile from '../src/client/components/Profile/profile';
import SurveyForm from '../src/client/components/SurveyForm/SurveyForm';
import CompletedForm from '../src/client/components/CompletedForm/CompletedForm';



function App() {
  return (
    <div className="App">
      <div className="backgroundWrapper">
        <BrowserRouter>
          <Routes>
            {/* CLIENT path */}
            <Route index element={<FrontPage />} />
            <Route path="/Frontpage" element={<FrontPage />} />
            <Route path="/RegisterSurveyForm" element={<CrossCheckSurveyForm />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/SurveyPage" element={<SurveyPage />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/JobPage" element={<JobPage />} />
            <Route path="/JobPageGive" element={<JobPageGive />} />
            <Route path="/JobPageGive/addjobform" element={<AddJobForm />} />
            <Route path="/JobPageList" element={<JobPageList />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/SurveyForm" element={<SurveyForm />} />
            <Route path="/CompletedForm" element={<CompletedForm />} />
       
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
