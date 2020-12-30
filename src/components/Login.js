import React, {Component} from 'react'; 
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import PopUp from './PopUp';
import BoardsAPI from './../data/BoardsAPI'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loginParameters: {
        emailAddress: '',
        password: ''
      },
      showResponse: false,
      response: {
        message: "",
        popUpType: ""
      }
    }
  }

    handleSubmit(loginParameters) {
      const {emailAddress, password} = loginParameters;
      BoardsAPI.login(emailAddress, password)
        .then(response => { 
          console.log("Go to next page.")
          this.setLocalStorage(response);
        })
        .catch(e => {
          console.log(e.response.data.message);
          const newResponse = {
            message: e.response.data.message,
            type: "error"
          };
          this.setState({showResponse: true, response: newResponse});
        });
    }

    handleFormChange(event) {
      const {id, value} = event.target;
      const newLoginParameters = Object.assign({}, this.state.loginParameters, {[id]: value});
      this.setState({loginParameters: newLoginParameters})
    }

    setLocalStorage(response) {
      localStorage.id = response.data.data._id;
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("refresh", response.data.data.refresh);
      localStorage.setItem("token", response.data.data.token);
    }

    closeSnackBar() {
      this.setState({showResponse: false});
    }

    render() {
        const {emailAddress, password} = this.state.loginParameters;
        const {message, popUpType} = this.state.response;
        const {classes} = this.props;

        console.log(localStorage.id);
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="emailAddress"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={emailAddress}
                    onChange={event=>this.handleFormChange(event)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={event=>this.handleFormChange(event)}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=> {this.handleSubmit(this.state.loginParameters)}}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                <Snackbar open={this.state.showResponse} autoHideDuration={6000} onClose={() => this.closeSnackBar()}>
                  <PopUp message={message} severity={popUpType}/>
                </Snackbar>
              </div>
            </Container>
          );
    }
 
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true}) (Login);