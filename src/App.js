import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Login from './components/Public/Login/Login';

import Portal from './components/Public/Portal/Portal';
import PortalSubmission from './components/Public/PortalSubmission/PortalSubmission'
import ThankYou from './components/Public/ThankYou/ThankYou'

import Listings from './components/Admin/Listings'
import EditListing from './components/Admin/EditListing'
import AdminNewListing from './components/Admin/AdminNewListing'
import ApplicantDashboard from './components/Admin/ApplicantDashboard'
import ApplicantInfo from './components/Admin/ApplicantInfo'

import NotFoundPage from './components/Public/PageNotFound/PageNotFound';
function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
          {/* TODO: / -> Main homepage */}
          <Route exact path="/" component={Portal} />
          <Route exact path="/portal" component={Portal} />
          <Route exact path="/portal/:id" component={PortalSubmission}/>
          <Route exact path="/thank-you" component={ThankYou} />
          <Route path="/login" component={Login} />

          {/* TODO: /admin -> Admin Dashboard Homepage */}
          <Route exact path="/admin/listing" component={Listings} />
          <Route exact path="/admin/listing/:id" component={EditListing} />
          <Route exact path="/admin/listing/:id/applicant" component={ApplicantDashboard} />
          <Route exact path="/admin/listing/:id/applicant/:applicantId" component={ApplicantInfo} />
          <Route path="/admin/create-listing" component={AdminNewListing} />

          {/* TODO: / -> Error Page */}
          <Route component={NotFoundPage} />
          </Switch>
          {/* TODO: /admin/console -> Admin console homepage (not a priority) to change secret keys for signup */}
        </div>
      </Router>
  );
}

export default App;
