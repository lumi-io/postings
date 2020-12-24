import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Dashboard} />
        <Route path="/form" component={Form} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp}/>
      </div>
    </Router>
  );
}

export default App;
