import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Login from './components/Login';
import SideMenu from './components/SideMenu';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Dashboard} />
        <Route path="/form" component={Form} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
