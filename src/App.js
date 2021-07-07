import { Route, BrowserRouter as Router } from 'react-router-dom'

import Login from './components/Public/Login';

import Portal from './components/Public/Portal';
import PortalSubmission from './components/Public/PortalSubmission'

import Listings from './components/Admin/Listings'
import EditListing from './components/Admin/EditListing'
import AdminNewListing from './components/Admin/AdminNewListing'
import ApplicantDashboard from './components/Admin/ApplicantDashboard'
import ApplicantInfo from './components/Admin/ApplicantInfo'


function App() {
  return (
      <Router>
        <div className="App">
          {/* TODO: / -> Main homepage */}
          <Route exact path="/portal" component={Portal} />
          <Route exact path="/portal/:id" component={PortalSubmission}/>
          <Route path="/login" component={Login} />

          {/* TODO: /admin -> Admin Dashboard Homepage */}
          <Route exact path="/admin/listing" component={Listings} />
          <Route exact path="/admin/listing/:id" component={EditListing} />
          <Route exact path="/admin/listing/:id/applicant" component={ApplicantDashboard} />
          <Route exact path="/admin/listing/:id/applicant/:applicantId" component={ApplicantInfo} />
          <Route path="/admin/create-listing" component={AdminNewListing} />
          
          {/* TODO: /admin/console -> Admin console homepage (not a priority) to change secret keys for signup */}
        </div>
      </Router>
  );
}

export default App;
