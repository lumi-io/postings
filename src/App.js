import { Route, BrowserRouter as Router } from 'react-router-dom'
import Form from './components/Form';
import Listing from './components/Listing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Admin from './components/Admin'

function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path={["","/admin"]} component={Admin} />
          <Route path="/form" component={Form} />
          <Route path="/listing" component={Listing} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
        </div>
      </Router>
  );
}

export default App;
