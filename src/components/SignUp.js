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
import BoardsAPI from './../data/BoardsAPI';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpParameters: {
                firstName: '',
                lastName: '',
                emailAddress: '',
                password: ''
            },
            showResponse: false,
            response: {
              message: '',
              popUpType: ''
            }

        }
    }

    handleSubmit(signUpParameters) {
      const {emailAddress, password} = signUpParameters;
      BoardsAPI.register(emailAddress, password)
        .then(response => { 
          const newResponse = {
          message: response.data.message,
          type: "success"
          };
          this.setState({showResponse: true, response: newResponse});
        })
        .catch(e => {
          const newResponse = {
            message: e.response.data.message,
            type: "error"
            };
            this.setState({showResponse: true, response: newResponse});
        });
    }
    
    handleFormChange(event) {
        const {id, value} = event.target;
        const newSignUpParameters = Object.assign({}, this.state.signUpParameters, {[id]: value});
        this.setState({signUpParameters: newSignUpParameters})
    }

    closeSnackBar() {
      this.setState({showResponse: false});
    }


    render() {
        const {firstName, lastName, emailAddress, password} = this.state.signUpParameters;
        const {message, popUpType} = this.state.response;
        const {classes} = this.props;
        
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={firstName}
                        onChange={event=>this.handleFormChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={lastName}
                        onChange={event=>this.handleFormChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="emailAddress"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={emailAddress}
                        onChange={event=>this.handleFormChange(event)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => this.handleFormChange(event)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=> {this.handleSubmit(this.state.signUpParameters)}}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2">
                        Already have an account? Sign in
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true}) (SignUp);