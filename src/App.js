import { Route, BrowserRouter as Router } from 'react-router-dom'
import Form from './components/Form';
import Listing from './components/legacy/Listing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Admin from './components/Admin'
import AdminListing from './components/AdminListing'
import AdminNewListing from './components/AdminNewListing'
import ApplicantDashboard from './components/ApplicantDashboard'
import ApplicantInfo from './components/ApplicantInfo'

function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path={["","/admin"]} component={Admin} />
          <Route exact path="/admin/listing/:id" component={AdminListing} />
          <Route exact path="/admin/listing/:id/applicant" component={ApplicantDashboard} />
          <Route exact path="/admin/listing/:id/applicant/:applicantId" component={ApplicantInfo} />
          <Route path="/admin/create-listing" component={AdminNewListing} />
          <Route path="/form" component={Form} />
          <Route path="/listing" component={Listing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
  );
}

export default App;
