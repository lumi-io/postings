import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Login from './components/Public/Login/Login';

import Portal from './components/Public/Portal/Portal';
import PortalSubmission from './components/Public/PortalSubmission/PortalSubmission';
import ThankYou from './components/Public/ThankYou/ThankYou';
import Terms from './components/Public/Terms/Terms';
import LoadingScreen from './components/Public/Loading';

import Listings from './components/Admin/Listings'
import EditListing from './components/Admin/EditListing'
import CreateListing from './components/Admin/CreateListing/CreateListing'
import ApplicantDashboard from './components/Admin/ApplicantDashboard/ApplicantDashboard'


import NotFoundPage from './components/Public/PageNotFound/PageNotFound';


function App() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (!loading){
  return (
      <Router>
        <div className="App">
          <Switch>
          {/* TODO: / -> Main homepage */}
          <Route exact path="/" component={Portal} />
          <Route exact path="/portal" component={Portal} />
          <Route exact path="/portal/:id" component={PortalSubmission}/>
          <Route exact path="/thank-you" component={ThankYou} />
          <Route exact path="/terms" component={Terms} />
          <Route path="/login" component={Login} />

          {/* TODO: /admin -> Admin Dashboard Homepage */}
          <Route exact path="/admin/listing" component={Listings} />
          <Route exact path="/admin/listing/:id" component={EditListing} />
          <Route exact path="/admin/listing/:id/applicant" component={ApplicantDashboard} />
          <Route path="/admin/create-listing" component={CreateListing} />

          {/* TODO: / -> Error Page */}
          <Route component={NotFoundPage} />
          </Switch>
          {/* TODO: /admin/console -> Admin console homepage (not a priority) to change secret keys for signup */}
        </div>
      </Router>
  );}
  else {
    return (<LoadingScreen />);
  }
}

export default App;
