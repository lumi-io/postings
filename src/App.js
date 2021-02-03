import { Route, BrowserRouter as Router } from 'react-router-dom'

import Form from './components/Public/Form';
import Listing from './components/legacy/Listing';
import Login from './components/Public/Login';
import SignUp from './components/Public/SignUp';

import Portal from './components/Public/Portal';
import PortalSubmission from './components/Public/PortalSubmission'

import Listings from './components/Listings'
import AdminListing from './components/AdminListing'
import AdminNewListing from './components/AdminNewListing'
import ApplicantDashboard from './components/ApplicantDashboard'
import ApplicantInfo from './components/ApplicantInfo'

function App() {
  return (
      <Router>
        <div className="App">
          {/* TODO: / -> Main homepage */}
          {/* TODO: /portal -> Page with all the listings that people can choose what they want to apply to */}
          <Route exact path="/portal" component={Portal} />
          <Route exact path="/portal/:id" component={PortalSubmission}/>
          {/* TODO: /portal/:id -> Application page for job with :id */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/form" component={Form} />
          <Route path="/listing" component={Listing} />

          {/* TODO: /admin -> Admin Dashboard Homepage */}
          <Route exact path="/admin/listing" component={Listings} />
          <Route exact path="/admin/listing/:id" component={AdminListing} />
          <Route exact path="/admin/listing/:id/applicant" component={ApplicantDashboard} />
          <Route exact path="/admin/listing/:id/applicant/:applicantId" component={ApplicantInfo} />
          <Route path="/admin/create-listing" component={AdminNewListing} />
          
          {/* TODO: /admin/console -> Admin console homepage (not a priority) to change secret keys for signup */}
        </div>
      </Router>
  );
}

export default App;
